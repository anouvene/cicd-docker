const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create({
    binary: {
      version: '4.4.24', // ✅ Version compatible ARM + x86
    },
  });
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});