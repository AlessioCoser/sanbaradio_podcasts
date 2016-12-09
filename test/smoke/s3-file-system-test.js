var fs = require('fs')
var assert = require('assert')
var stringToStream = require('string-to-stream')
var testUtils = require('../test_utils')
var S3FileSystem = require('../../lib/s3-file-system')

var folder = 'sanbaradio-podcasts'
var inputFileName = 'pods-test.json'

describe('S3FileSystem', function () {
  it('reads from S3 Bucket', function (done) {
    this.timeout(30000)

    var inputContent = 'lorem ipsum dolor sit amet.'

    testUtils.deleteS3Object(folder, inputFileName)
    .then(() => testUtils.putS3Object(folder, inputFileName, inputContent))
    .then(() => {
      var s3FileSystem = new S3FileSystem()
      var data = []

      s3FileSystem.readAsStream(folder, inputFileName)
      .on('data', chunk => data.push(chunk))
      .on('end', () => {
        assert.equal(String.prototype.concat(data), 'lorem ipsum dolor sit amet.')
        done()
      })
    })
  })

  it('writes to S3 Bucket', function () {
    this.timeout(10000)
    var s3FileSystem = new S3FileSystem()
    var aStream = stringToStream('Lorem ipsum dolor sot amet.\n')

    return testUtils.deleteS3Object(folder, inputFileName)
    .then(() => s3FileSystem.writeAsStream(folder, inputFileName, aStream))
    .then(() => testUtils.waitUntilS3ObjectExists(folder, inputFileName))
    .then(data => {
      let fileContent = (data.Body) ? data.Body.toString() : ''

      assert.equal(fileContent, 'Lorem ipsum dolor sot amet.\n')
    })
  })
})
