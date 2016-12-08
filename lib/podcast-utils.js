const Podcast = require('./podcast')

const jsonToPods = function (json) {
  var items = json["items"]

  if ((items == null) || (items == undefined)) {
    return []
  }

  return items
  .map((item) => new Podcast(item))
  .filter((pod) => pod.valid())
}

const podsToJson = function (podcasts) {
  return podcasts.map((pod) => pod.toJson())
}

module.exports = {
  jsonToPods,
  podsToJson
}
