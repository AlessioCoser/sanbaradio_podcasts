const request = require('request')
const xmlParser = require('xml2js').Parser()

const RssService = function (url){
  this.toJson = function () {
    return new Promise((resolve, reject) => {
      request(url, function(err, resp, body) {
        if (err) {
          reject(err)
        }

        if (resp.statusCode != 200) {
          reject(resp)
        }

        xmlParser.parseString(body, function(error, json) {
          if (error) {
            reject(error)
          }
          resolve(json)
        })
      })
    })
  }
}

module.exports = RssService
