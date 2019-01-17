const AWS = require("aws-sdk");

const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;

if (IS_OFFLINE === "true") {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
    accessKeyId: "DEFAULT_ACCESS_KEY", // needed if you don't have aws credentials at all in env
    secretAccessKey: "DEFAULT_SECRET"
  });
  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

module.exports = {
  dynamoDb
};
