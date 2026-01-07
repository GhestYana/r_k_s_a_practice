const { MongoClient } = require('mongodb');

const url = `mongodb://mongo:mongo@mongo:27017`;
const client = new MongoClient(url);

let db;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.MONGO_DB || 'mydb');
  }
  return db;
}

module.exports = { connect };
