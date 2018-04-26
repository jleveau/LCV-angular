const path = require('path')
const express = require('express')
const app = express()
var proxy = require('http-proxy-middleware');
const morgan = require('morgan')
const http = require('http')
const https = require('https')
const fs = require('fs')
const config = require("config")
const forceSSL = require('express-force-ssl');

// SSL configuration
var options = {
  key: fs.readFileSync(config.sslOptions.key, "utf8"),
  cert: fs.readFileSync(config.sslOptions.cert, "utf8"),
  };
if (config.sslOptions.passphrase) {
  options.passphrase = config.sslOptions.passphrase
}
if (config.sslOptions.ca) {
  options.ca = fs.readFileSync(config.sslOptions.ca, "utf8")
}
process.env.TZ = 'Europe/Paris' 

console.log(config.https)
if (config.https) {
  app.use(forceSSL)
}
app.use(express.static(path.resolve(path.join(__dirname, "../dist"))))
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "html")

//logger
app.use(morgan('dev'))

//redirecting event app
app.use('/api/events', proxy({target: 'http://' + config.services.events, changeOrigin: true}));
app.use('/api/users', proxy({target: 'http://' + config.services.users, changeOrigin: true}));


//Serving angular application
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))

const server = http.createServer(app);
const serverSSL = https.createServer(options, app);


server.listen(3000);
serverSSL.listen(443);