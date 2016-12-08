const RssService = require('./lib/rss-service')
const podcastUtils = require('./lib/podcast-utils')

exports.podcasts = function (event, context) {
  var rssService = new RssService('http://www.sanbaradio.it/podcast/feed')

  return rssService.toJson()
  .then(podcastUtils.jsonToPods)
  .then(podcastUtils.podsToJson)
  .then(context.succeed)
  .catch(context.fail)
};
