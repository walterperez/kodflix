const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const assert = require("assert");
require("dotenv/config");

let url = "";
let dbName = "";
if (process.env.NODE_ENV) {
  console.log(process.env.NODE_ENV);

  //If we are in PRODUCTION
  url = process.env.DB_URL_PRD;
  console.log(url);
  dbName = "Kodflix"; //K in caps in production
} else {
  // If we are in DEV
  console.log("we are in dev local");
  url = "mongodb://localhost:27017";
  dbName = "kodflix"; //k in lowercase in DEV
}

function connect() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  return new Promise(resolve => {
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db(dbName);
      console.log("Connected successfully to server: ", db.s.databaseName);
    });
  });
}

module.exports = { connect };
