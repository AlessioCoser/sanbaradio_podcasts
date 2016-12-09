# Simple Feed Podcasts Listener
This is a simple feed podcast listener made with claudiajs and claudia-bot-builder on AWS Lambda

### Requirements

- nodejs & npm
- AWS account

### Install

```
npm install
```

Add S3FullAccess Permission to your lambda executor

### Create the lambda

```
npm run create [-- --profile your-aws-profile]
```

## Update the Lambda

```
npm run update [-- --profile your-aws-profile]
```

## Destroy the Lambda

```
npm run destroy [-- --profile your-aws-profile]
```

## Add a scheduled event
https://github.com/claudiajs/claudia/blob/master/docs/add-scheduled-event.md

```
claudia add-scheduled-event --event event.json --name sync-sanba-pods
```
