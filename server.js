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

app.get('/:productid/:userid', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.post('/:productid/:userid', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.use('/:productid/:userid', proxy({ target: 'http://ec2-54-175-87-50.compute-1.amazonaws.com' }));

app.get('*', (req, res) => { //redirect is #1 reason for loader io not varifying the token
  res.redirect('/2/2019');
})

app.listen(3000);