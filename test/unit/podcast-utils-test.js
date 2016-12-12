const assert = require('assert')
const testUtils = require('../test_utils')
const podcastUtils = require('../../lib/podcast-utils')

describe('PodcastUtils', function () {
  describe('parseJson', function () {
    it('returns an empty array with null', function() {
      var json = testUtils.jsonPayload(null)

      assert.deepEqual(podcastUtils.parseJson(json), [])
    })

    it('returns an empty array with no attributes', function() {
      var json = testUtils.jsonPayload({})

      assert.deepEqual(podcastUtils.parseJson(json), [])
    })

    it('returns an empty array with no elements', function() {
      var json = testUtils.jsonPayload([])

      assert.deepEqual(podcastUtils.parseJson(json), [])
    })

    it('returns an array of Podcasts from a json', function () {
      var json = testUtils.jsonPayload([testUtils.jsonItem('first'), testUtils.jsonItem('second')])

      var podcasts = podcastUtils.parseJson(json)

      assert.equal(podcasts.length, 2)
      assert.equal(podcasts[0].episode, "first Title")
      assert.equal(podcasts[0].file.url, "http://first.enc")
    })

    it('returns only valid Podcasts', function () {
      var json = testUtils.jsonPayload([testUtils.jsonItem('first'), testUtils.invalidItem()])

      var podcasts = podcastUtils.parseJson(json)

      assert.equal(podcasts.length, 1)
    })
  })
})
