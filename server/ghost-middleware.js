const request = require('request')
const _promise = require('request-promise')
const secret =  process.env.NODE_ENV == 'production' ? process.env : require('../secrets')


var fetchAllPosts = (req, res, next) => {
  _promise({
    uri: secret.domain + '/ghost/api/v0.1/posts/?page=' + req.query.page
      + '&limit=12&include=tags%2Cauthor&client_id='+ secret.clientId
      +'&client_secret='+ secret.clientSecret

    , headers: {
      'User-Agent': 'Request-Promise',
      'Accept': 'application/json'
    }

    , json: true
  })
    .then(function (response) {
      res.status(200)
      res.send(response)
      res.end()
    })
    .catch(function (err) {
        console.log(err)
    })
}

var fetchSinglePost = (req, res, next) => {

  _promise({
    uri: secret.domain + '/ghost/api/v0.1/posts/slug/' + req.query.slug
      + '/?include=tags%2Cauthor&client_id='+ secret.clientId
      +'&client_secret='+ secret.clientSecret

    , headers: {
      'User-Agent': 'Request-Promise',
      'Accept': 'application/json'
    }

    , json: true
  })
    .then(function (response) {
      res.status(200)
      res.send(response)
      res.end()
    })
    .catch(function (err) {
        console.log(err)
    })
}

var ghostMiddleware = {
  fetchAllPosts,
  fetchSinglePost
}

module.exports = ghostMiddleware
