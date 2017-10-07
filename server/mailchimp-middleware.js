const request = require('request')
const _promise = require('request-promise')
const secret =  process.env.NODE_ENV == 'production' ? process.env : require('../secrets')

var subscribe = (req, res, next) => {
  _promise({
    method: 'POST',
    uri: 'https://' + secret.mailChimpInstance
      + '.api.mailchimp.com/3.0/lists/'
      + secret.mailChimpListID + '/members/'

    , headers: {
      'User-Agent': 'Request-Promise',
      'Content-Type': 'application/json',
      'Authorization': 'apikey '+ secret.mailChimpAPIkey
    }

    , body: {
      'email_address': req.body.email,
      'status': 'subscribed'
    }

    , json: true
  })
    .then(function (response) {
      res.send({success: true, failure: false})
      res.end()
    })
    .catch(function (err) {
      if (err.statusCode === 400) {
        res.send({success: false, failure: true})
        res.end()
      }
    })
}

var mailChimpMiddleware = {
  subscribe
}

module.exports = mailChimpMiddleware
