const { dynamoDb } = require("./dynamodb");
const TABLE_NAME = "user";

const add = (req, res) => {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: TABLE_NAME,
    Item: {
      userId: userId,
      name: name
    }
  };

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not create user" });
    }
    res.json({ userId, name });
  });
};

const get = (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      userId: req.params.userId
    }
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not get user" });
    }
    if (result.Item) {
      const { userId, name } = result.Item;
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
};

const remove = () => {};

const update = () => {};

module.exports = {
  add,
  get,
  remove,
  update
};
