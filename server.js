require('newrelic')
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon')
const proxy = require('http-proxy-middleware')

const app = express();

app.use(cors());

app.use(compression());

 app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use('/files', express.static(`${__dirname}/public`));

app.get('/loaderio-46789894de2a20b1adcd3a76de937c9e.txt', (req, res) => {
  res.sendFile(`${__dirname}/public/loaderio-46789894de2a20b1adcd3a76de937c9e.txt`);
})

app.get('/:productid/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.post('/:productid/:userid', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.use('/api/reviews', proxy({
  target: 'http://ec2-3-90-53-108.compute-1.amazonaws.com'
}));

app.use('/api/related', proxy({
  target: 'http://ec2-54-153-105-133.us-west-1.compute.amazonaws.com'
}));

app.use('/api/products', proxy({
  target: 'http://ec2-3-94-89-165.compute-1.amazonaws.com'
}));

app.use('/api', proxy({
  target: 'http://ec2-54-211-88-14.compute-1.amazonaws.com'
}));

app.get('*', (req, res) => { //redirect is #1 reason for loader io not varifying the token
  res.redirect('/1');
})

app.listen(80);