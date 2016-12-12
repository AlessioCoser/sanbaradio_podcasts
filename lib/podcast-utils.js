const parsePodcast = require('./parse-podcast')

const parseJson = function (payload) {
  var getItems = function(json) {
    if ((json == null) ||
        (json.rss == null) ||
        (!Array.isArray(json.rss.channel)) ||
        (json.rss.channel[0].item == null)) {
      return []
    }

    return json.rss.channel[0].item
  }

  var items = getItems(payload)

  return items
  .map((item) => parsePodcast(item))
  .filter((pod) => pod !== null)
}

module.exports = {
  parseJson
}
