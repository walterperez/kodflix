const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const assert = require("assert");
const url = "mongodb://localhost:27017";
const dbName  = "kodflix";

function connect() {
  const client = new MongoClient(url);
  return new Promise(resolve => {
    client.connect(function(err) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      resolve(db);
    });
  });
}

module.exports = { connect };
