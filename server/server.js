const path = require('path')

const express = require('express')
const app = express()
var proxy = require('http-proxy-middleware');
const morgan = require('morgan')

process.env.TZ = 'Europe/Paris' 

app.use(express.static(path.resolve(path.join(__dirname, "../dist"))))
app.set("view engine", "html")

app.use(morgan('dev'))
app.use('/api/events', proxy({target: 'http://events:3001', changeOrigin: true}));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))

app.listen(3000, () => console.log('Example app listening on port 3000!'))