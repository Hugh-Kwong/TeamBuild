const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
    
const connect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const connection = await MongoClient.connect(mongoServer.getUri(), {});
};

const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

const clear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
export default { connect, close, clear };