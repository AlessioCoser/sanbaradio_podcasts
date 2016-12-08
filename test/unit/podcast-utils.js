const assert = require('assert')
const podcastUtils = require('../../lib/podcast-utils')
const Podcast = require('../../lib/podcast')

describe('PodcastUtils', function () {
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

  it('returns an array of Podcasts from a json', function () {
    var json = {items: [ jsonItem('first'), jsonItem('second')]}

    var podcasts = podcastUtils.jsonToPods(json)
    var firstPodcast = podcasts[0]

    assert.equal(firstPodcast.title(), "first Title")
    assert.equal(firstPodcast.file().url, "http://first.enc")
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
