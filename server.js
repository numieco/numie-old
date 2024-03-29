require('babel-register')({
    presets: ['react', 'es2015', 'stage-2']
})

const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const xoauth2 = require('xoauth2')
const Slack = require('slack-node')

const secret =  process.env.NODE_ENV == 'production' ? process.env : require('./secrets')
const host = process.env.HOST || "localhost"
const port = process.env.PORT || 3000

let slack = new Slack()
slack.setWebhook(secret.slackWebhookURL)

app.prepare()
.then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))

  server.use((req, res, next) => {
    if (process.env.NODE_ENV == 'production' && req.header ('x-forwarded-proto') !== 'https'){
      console.log(`https://${req.header('host')}${req.url}`)
      res.redirect(`https://${req.header('host')}${req.url}`)
    }
    else
      next()
  })

  server.post('/getdata', (req, res) => {
    console.log(req.body)

    slack.webhook({
      channel: 'inquiries',
      username: 'inquiries-bot',
      text: '=========================' +
        '\n\n*' + (req.body.budget != '' ? 'Work' : 'General') + '*' + ' Inquiry!' +
        '\n\n*Name* : ' + req.body.firstname +
        '\n\n*Email* : ' + req.body.email +
        (
          req.body.phone != ''
          ? ('\n\n*Phone* : ' + req.body.phone)
          : ''
        ) +
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
          clientId: secret.xoauth2ClientID,
          clientSecret: secret.xoauth2ClientSecret,
          refreshToken: secret.xoauthRefreshToken
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
        (
          req.body.phone != ''
          ? ('<br><b>Phone</b> : <a href="tel:'+ req.body.phone +'">' + req.body.phone + '</a>')
          : ''
        ) +
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
    res.status(200)
    res.end()
  })


  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
  })
})
