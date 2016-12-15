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

  var getTitle = function(){
    if (Array.isArray(payload.title)) {
      return payload.title[0]
    }

    if(payload.title == null) {
      return ''
    }
    return payload.title
  }

  var getSubtitle = function() {
    if (Array.isArray(payload['itunes:subtitle'])) {
      return payload['itunes:subtitle'][0]
    }

    return payload['itunes:subtitle']
  }

  var getChannel = function () {
    if (Array.isArray(payload['itunes:keywords'])) {
      return payload['itunes:keywords'][0]
    }
    return payload['itunes:keywords']
  }

  var getTitleWithoutChannel = function () {
    var searchChannel = new RegExp(escape(getChannel()),"i");
    var title = getTitle()
    var match = title.match(searchChannel)

    if (match) {
      var channel = match[0]

      return title
      .split(channel + ' - ').join('')
      .split(channel + ' ').join('')
      .split(channel).join('')
    } else {
      return title
    }
  }

  var valid = function() {
    if (isEmpty(payload) || payload == null || payload == undefined) {
      return false
    }

    if ((getEpisode() == null) || (getEpisode() == undefined)) {
      return false
    }

    if ((getFile() == null) || (getFile() == undefined)) {
      return false
    }

    return true
  }

  var getEpisode = function () {
    var subtitle = getSubtitle()

    if (subtitle == undefined || subtitle == null || subtitle == '') {
      return getTitleWithoutChannel()
    }

    return subtitle
  }

  var getDescription = function () {
    if (Array.isArray(payload['itunes:summary'])) {
      return payload['itunes:summary'][0]
    }
    return payload['itunes:summary']
  }

  var getFile = function () {
    var enclosure = payload["enclosure"]

    if (Array.isArray(payload['enclosure'])) {
      enclosure = payload['enclosure'][0]['$']
    }

    if ((enclosure != null) && (enclosure != undefined) && (!isEmpty(enclosure))){
      return enclosure
    }

    return null
  }

  var getDate = function () {
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
    channel: getChannel(),
    episode: getEpisode(),
    description: getDescription(),
    file: getFile(),
    date: getDate()
  }
}

module.exports = parsePodcast
