# Serverless example

## Usage
* `npm run install-local-dynamodb`
  * Install local DynamoDB

* `npm start`
  * Start local development with serverless-offline

* `npm run deploy`
  * Deploy to AWS
  * Note: must install aws-cli to create local credentials beforehand


## Admin for local DynamoDB
* Set environment variable
  * MacOS: `export DYNAMO_ENDPOINT=http://localhost:8000`
  * Windows: `set DYNAMO_ENDPOINT=http://localhost:8000`
  * Run `npm run serverless-dynamodb-local`