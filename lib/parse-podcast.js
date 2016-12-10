const parsePodcast = function (payload){
  var escape = function (text) {
    if (text === undefined){
      return ""
    }

    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  var isEmpty = function (obj) {
    return Object.keys(obj).length === 0
  }

  var category = function () {
    if (Array.isArray(payload['itunes:keywords'])) {
      return payload['itunes:keywords'][0]
    }
    return payload['itunes:keywords']
  }

  var titleWithoutCategory = function () {
    var searchCategory = new RegExp(escape(category()),"i");
    var match = payload.title[0].match(searchCategory)

    if (match) {
      var cat = match[0]

      return payload.title[0].split(cat + ' - ').join('')
      .split(cat + ' ').join('')
      .split(cat).join('')
    } else {
      return payload['title']
    }
  }

  var valid = function() {
    if ((episode() == null) || (episode() == undefined)) {
      return false
    }

    if ((file() == null) || (file() == undefined)) {
      return false
    }

    return true
  }

  var episode = function () {
    var subtitle = payload['itunes:subtitle']

    if (Array.isArray(payload['itunes:subtitle'])) {
      subtitle = subtitle[0]
    }

    if (subtitle == undefined || subtitle == null || subtitle == '') {
      return titleWithoutCategory()
    }

    return subtitle
  }

  var description = function () {
    if (Array.isArray(payload['itunes:summary'])) {
      return payload['itunes:summary'][0]
    }
    return payload['itunes:summary']
  }

  var file = function () {
    var enclosure = payload["enclosure"]

    if (Array.isArray(payload['enclosure'])) {
      enclosure = payload['enclosure'][0]['$']
    }

    if ((enclosure != null) && (enclosure != undefined) && (!isEmpty(enclosure))){
      return enclosure
    }

    return null
  }

  var date = function () {
    var pubDate = payload['pubDate']

    if (Array.isArray(payload['pubDate'])) {
      pubDate = payload['pubDate'][0]
    }

    if (pubDate == undefined || isEmpty(pubDate) || pubDate === "") {
      return null
    }

    return new Date(pubDate)
  }

  if (!valid()) {
    return null
  }

  return {
    category: category(),
    episode: episode(),
    description: description(),
    file: file(),
    date: date()
  }
}

module.exports = parsePodcast
