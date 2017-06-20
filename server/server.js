require('babel-register')({
    presets: ['react', 'es2015', 'stage-2']
})

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const xoauth2 = require('xoauth2')
const Slack = require('slack-node')
const secret =  require('../src/secrets')
const app = express()
const host = process.env.HOST || "localhost"
const port = process.env.PORT || 8888

app.use(express.static(path.resolve(__dirname, "..", "public")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
/*
  All routes which are defined in React app
  will be handled at client-side (using react-router).
*/

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html"))
})

let slack = new Slack()
slack.setWebhook(secret.slackWebhookURL)


app.post('/getdata', (req, res) => {
  console.log(req.body)
  
  slack.webhook({
    channel: 'inquiries',
    username: 'dkapadiya',
    text: 'Email : ' + req.body.email + '\n\nPhone : ' + req.body.phone + '\n\nDescription : ' + req.body.description + '\n\nBudget : ' + req.body.budget
  }, (err, resp) => {
    if (err)
      console.log(err)
  })

  let transport = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: "test.numie@gmail.com",
        clientId: secret.xoauth2ClientID,
        clientSecret: secret.xoauth2ClientSecret,
        refreshToken: secret.xoauthRefreshToken
      })
    }
  }))

  let mailOptions = {
    from: 'dhanesh.kapadiya92@gmail.com',
    to: 'dhanesh.kapadiya92@gmail.com',
    subject: req.body.budget != '' ? 'General Enquiry' : 'Business Enquiry',
    text: 'Email : ' + req.body.email + '\n\nPhone : ' + req.body.phone + '\n\nDescription : ' + req.body.description + '\n\nBudget : ' + req.body.budget
  }

  transport.sendMail(mailOptions, (err, response) => {
    if (err) 
      console.log(err)
    else
      console.log('success')
  })

  res.end()
})

app.listen(port, () => {
  console.log("server started at port: " + port)
})