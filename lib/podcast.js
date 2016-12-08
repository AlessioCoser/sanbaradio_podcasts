const Podcast = function (payload){
  this.valid = function() {
    if ((this.title() == null) || (this.title() == undefined)) {
      return false
    }

    if ((this.file() == null) || (this.file() == undefined)) {
      return false
    }

    return true
  }

  this.title = function () {
    return payload.title
  }

  this.file = function () {
    if ((payload.enclosures == null) || (payload.enclosures == undefined)){
      return null
    }

    return payload.enclosures[0]
  }

  this.toJson = function () {
    if (!this.valid()) {
      return null
    }

    return {
      title: this.title(),
      file: this.file()
    }
  }
}

module.exports = Podcast
