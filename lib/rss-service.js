const Feed = require('rss-to-json')

const RssService = function (url){
  this.toJson = function () {
    return new Promise((resolve, reject) => {
      Feed.load(url, function(err, rss){
        console.log(rss)
        if(err) {
          reject(err)
        }
        resolve(rss)
      })
    })
  }
}

module.exports = RssService
