const { dynamoDb } = require("./dynamodb");
const TABLE_NAME = "user";

const add = user => {
  const params = {
    TableName: TABLE_NAME,
    Item: user
  };

  return new Promise((resolve, reject) => {
    dynamoDb.put(params, error => {
      if (error) {
        return reject(error);
      }
      resolve(user);
    });
  });
};

const get = id => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      userId: id
    }
  };

  return new Promise((resolve, reject) => {
    dynamoDb.get(params, (error, result) => {
      console.log(error, result);
      if (error) {
        return reject(error);
      }
      if (result.Item) {
        const { userId, name } = result.Item;
        resolve({ userId, name });
      } else {
        const err = new Error("User not found");
        err.statusCode = 404;
        reject(err);
      }
    });
  });
};

module.exports = {
  add,
  get
};
