const path = require('path')

const express = require('express')
const app = express()
var proxy = require('http-proxy-middleware');
const morgan = require('morgan')
const http = require('http')
const https = require('https')
const fs = require('fs')

// SSL configuration
var sslOptions = {
    key: fs.readFileSync('sslcerts/key.pem'),
    cert: fs.readFileSync('sslcerts/cert.pem'),
    passphrase: "J'aime la soupe de tortue !"
  };
  
process.env.TZ = 'Europe/Paris' 
app.use(express.static(path.resolve(path.join(__dirname, "../dist"))))
app.set("view engine", "html")

//logger
app.use(morgan('dev'))

//redirecting event app
app.use('/api/events', proxy({target: 'http://localhost:3001', changeOrigin: true}));

//Serving angular application
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))

https.createServer(sslOptions, app).listen(3000)