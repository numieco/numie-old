require('babel-register')({
    presets: ['react', 'es2015', 'stage-2']
})

const express = require('express')
const path = require('path')

const app = express()
const host = process.env.HOST || "localhost"
const port = process.env.PORT || 8888

app.use(express.static(path.resolve(__dirname, "..", "public")))

/*
  All routes which are defined in React app
  will be handled at client-side (using react-router).
*/

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html"))
})

app.listen(port, () => {
  console.log("server started at port: " + port)
})