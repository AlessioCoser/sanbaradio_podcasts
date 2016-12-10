const stringToStream = require('string-to-stream')
const RssService = require('./lib/rss-service')
const podcastUtils = require('./lib/podcast-utils')
const S3FileSystem = require('./lib/s3-file-system')

exports.podcasts = function (event, context) {
  var rssService = new RssService('http://www.sanbaradio.it/podcast/feed')
  var folder = 'sanbaradio-podcasts'
  var fileName = 'pods.json'
  var s3FileSystem = new S3FileSystem()

  return rssService.toJson()
  .then(podcastUtils.parseJson)
  .then((json) => {
    var stream = stringToStream(JSON.stringify(json))
    return s3FileSystem.writeAsStream(folder, fileName, stream)
  })
  .then(context.succeed)
  .catch(context.fail)
}
