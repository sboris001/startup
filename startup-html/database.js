const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('users');
const ratingCollection = db.collection('ratings');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addRating(username, title, rating) {
    const ratingEntry = {
        username: username,
        title: title,
        rating: rating,
    };
    ratingCollection.insertOne(ratingEntry);
}

function getRatings(username) {
    const cursor = ratingCollection.find({username: username})
    return cursor.toArray();
}

function getAllRatings() {
    const cursor =  ratingCollection.find();
    return cursor.toArray();
}

function getOneRating(username, title, rating) {
    return ratingCollection.find({username: username, movie: title, rating: rating})
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addRating,
  getRatings,
  getOneRating,
  getAllRatings,
};
