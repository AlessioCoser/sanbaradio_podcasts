const parsePodcast = require('./parse-podcast')

const parseJson = function (json) {
  var items = json.rss.channel[0].item

  if ((items == null) || (items == undefined)) {
    return []
  }

  return items
  .map((item) => parsePodcast(item))
  .filter((pod) => pod !== null)
}

module.exports = {
  parseJson
}
