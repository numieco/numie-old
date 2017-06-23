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
slack.setWebhook(process.env.slackWebhookURL)


app.post('/getdata', (req, res) => {
  console.log(req.body)

  slack.webhook({
    channel: 'inquiries',
    username: 'dkapadiya',
    text: '=========================' + 
      '\n\n*' + (req.body.budget != '' ? 'Work' : 'General') + '*' + ' Inquiry!' +
      '\n\n*Name* : ' + req.body.firstname +
      '\n\n*Email* : ' + req.body.email + 
      '\n\n*Phone* : ' + req.body.phone + 
      (
        req.body.budget != ''
        ? ('\n\n*Budget* : ' + req.body.budget)
        : ''
      ) +
      '\n\n*Message* : ' + req.body.description ,
  }, (err, resp) => {
    if (err)
      console.log(err)
  })

  let transport = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: "test.numie@gmail.com",
        clientId: process.env.xoauth2ClientID,
        clientSecret: process.env.xoauth2ClientSecret,
        refreshToken: process.env.xoauthRefreshToken
      })
    }
  }))

  let mailOptions = {
    from: req.body.email,
    to: 'dhanesh.kapadiya92@gmail.com',
    replyTo: req.body.email,
    subject: req.body.budget != '' ? 'Work Inquiry!' : 'General Inquiry!',
    html: '<b>Name</b> : ' + req.body.firstname +
      '<br><b>Email</b> : ' + req.body.email + 
      '<br><b>Phone</b> : <a href="tel:'+ req.body.phone +'">' + req.body.phone + '</a>' +
      (
        req.body.budget != '' 
        ? ('<br><b>Budget</b> : ' + req.body.budget)
        : ''
      ) +
      '<br><b>Message</b> : ' + req.body.description,
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