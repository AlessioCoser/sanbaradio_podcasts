const assert = require('assert')
const podcastUtils = require('../../lib/podcast-utils')
const Podcast = require('../../lib/podcast')

describe('PodcastUtils', function () {
  describe('jsonToPods', function () {
    it('returns an empty array with null', function() {
      var json = {}
      var podcasts = podcastUtils.jsonToPods(json)

      assert.deepEqual(podcasts, [])
    })

    it('returns an empty array with no attributes', function() {
      var json = {}
      var podcasts = podcastUtils.jsonToPods(json)

      assert.deepEqual(podcasts, [])
    })

    it('returns an empty array with no elements', function() {
      var json = { items: []}
      var podcasts = podcastUtils.jsonToPods(json)

      assert.deepEqual(podcasts, [])
    })

    // it('returns an array of Podcasts from a json', function () {
    //   var json = {items: [ jsonItem('first'), jsonItem('second')]}

    //   var podcasts = podcastUtils.jsonToPods(json)

    //   assert.equal(podcasts.length, 2)
    //   assert.equal(podcasts[0].title(), "first Title")
    //   assert.equal(podcasts[0].file().url, "http://first.enc")
    // })

    // it('returns only valid Podcasts', function () {
    //   var json = {items: [ jsonItem('first'), invalidItem()]}

    //   var podcasts = podcastUtils.jsonToPods(json)

    //   assert.equal(podcasts.length, 1)
    // })
  })
})

var jsonItem = function(name) {
  return {
    title: `${name} Title`,
    description: `<p>Html Description</p>`,
    link: `http://${name}.link`,
    url: `http://${name}.url`,
    created: 1464018627000,
    enclosures: [{ url: `http://${name}.enc`, type: "audio/mpeg", length: 5000 }]
  }
}

var invalidItem = function() {
  return {
    name: 'my name',
    url: 'http://a.url'
  }
}
