const assert = require('assert')
const testUtils = require('../test_utils')
const parsePodcast = require('../../lib/parse-podcast')

describe('parsePodcast', function () {
  it('returns null without payload', function() {
    assert.deepEqual(parsePodcast({}), null)
  })

  it('returns a Podcast json', function() {
    var expectedJson = {
      episode: 'first Title',
      category: 'Category',
      description: '<p>Html Description</p>',
      date: new Date('Fri, 09 Dec 2016 14:10:15 +0000'),
      file: { url: 'http://first.enc', type: 'audio/mpeg', length: 5000}
    }

    assert.deepEqual(parsePodcast(testUtils.jsonItem('first')), expectedJson)
  })
})
