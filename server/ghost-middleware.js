const request = require('request')
const secret =  process.env.NODE_ENV == 'production' ? process.env : require('../secrets')

var ghostMiddleware = (req, res, next) => {
  let URL = secret.domain + '/ghost/api/v0.1/posts/?page=' + req.query.page 
    + '&limit=12&client_id='+ secret.clientId 
    +'&client_secret='+ secret.clientSecret

  request.get(URL, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      res.status(response.statusCode)
      res.send(response.body)
      res.end()
    } else {
      console.log(err)
    }
  })
}

module.exports = ghostMiddleware