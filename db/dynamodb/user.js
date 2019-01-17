const { dynamoDb } = require("./dynamodb");
const TABLE_NAME = "user";

const add = async user => {
  const params = {
    TableName: TABLE_NAME,
    Item: user
  };
  await dynamoDb.put(params).promise();
  return user;
};

const get = async id => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      userId: id
    }
  };

  const result = await dynamoDb.get(params).promise();
  if (result.Item) {
    const { userId, name } = result.Item;
    return { userId, name };
  } else {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }
};

module.exports = {
  add,
  get
};
