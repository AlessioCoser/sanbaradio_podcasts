var aws = require('aws-sdk')

module.exports = {
  deleteS3Object,
  putS3Object,
  readS3Object,
  waitUntilS3ObjectExists,
  jsonItem,
  invalidItem,
  jsonPayload
}

function deleteS3Object(bucket, key) {
  var s3 = new aws.S3({signatureVersion: 'v4'})

  return new Promise((resolve, reject) => {
    console.log('-- delete s3 object', bucket, key)
    s3.deleteObject({
      Bucket: bucket,
      Key: key
    }, (err, data) => err ? reject(err) : resolve(data))
  })
}

function putS3Object(bucket, key, body) {
  var s3 = new aws.S3({signatureVersion: 'v4'})
  return new Promise((resolve, reject) => {
    console.log('-- put s3 object', bucket, key)
    s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: body
    }, (err, data) => err ? reject(err) : resolve(data))
  })
}

function readS3Object(bucket, key) {
  var s3 = new aws.S3({signatureVersion: 'v4'})

  return new Promise((resolve, reject) => {
    console.log('-- read s3 object', bucket, key)
    s3.getObject({
      Bucket: bucket,
      Key: key
    }, (err, data) => err ? reject(err) : resolve(data))
  })
}

function waitUntilS3ObjectExists(bucket, key) {
  return new Promise((resolve, reject) => {
    var retries = 0
    var intervalId = setInterval(() => {
      console.log('-- waiting until s3 object exists', bucket, key)
      readS3Object(bucket, key)
      .then(resolve)
      .catch(() => {
        console.log('-- retries', retries)
        if (retries > 10) {
          reject(new Error(`file (${key}) not found in bucket (${bucket})`))
          clearInterval(intervalId)
        }
      })
      retries++
    }, 1000)
  })
}

function jsonItem(name) {
  return {
    'itunes:keywords': [`Category`],
    'itunes:subtitle': [`${name} Title`],
    'itunes:summary': [`<p>Html Description</p>`],
    link: [`http://${name}.link`],
    url: [`http://${name}.url`],
    pubDate: 'Fri, 09 Dec 2016 14:10:15 +0000',
    enclosure: [{ '$': {url: `http://${name}.enc`, type: 'audio/mpeg', length: 5000 }}]
  }
}

function invalidItem() {
  return {
    'itunes:keywords': [`Category`]
  }
}

function jsonPayload(items) {
  if (items === null) {
    return null
  }

  if (!Array.isArray(items)) {
    return {}
  }

  return {
    rss: {
      channel: [{item: items}]
    }
  }
}
