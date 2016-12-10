const assert = require('assert')
const Podcast = require('../../lib/podcast')

describe('Podcast.toJson', function () {
  it('returns null without payload', function() {
    var podcast = new Podcast({})

    assert.deepEqual(podcast.toJson(), null)
  })

  // it('returns a Podcast json', function() {
  //   var podcast = new Podcast(jsonItem('first'))

  //   var expectedJson = {
  //     title: 'first Title',
  //     file: { url: 'http://first.enc', type: 'audio/mpeg', length: 5000}
  //   }

  //   assert.deepEqual(podcast.toJson(), expectedJson)
  // })
})

var jsonItem = function(name) {
  return {
    'itunes:subtitle': `${name} Title`,
    'itunes:summary': `<p>Html Description</p>`,
    link: `http://${name}.link`,
    url: `http://${name}.url`,
    created: 1464018627000,
    enclosures: [{ url: `http://${name}.enc`, type: 'audio/mpeg', length: 5000 }]
  }
}
