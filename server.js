const path = require('path')

const express = require('express')
const app = express()


app.use(express.static(path.resolve(path.join(__dirname, "dist"))))
app.set("view engine", "html")

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))

app.listen(3000, () => console.log('Example app listening on port 3000!'))