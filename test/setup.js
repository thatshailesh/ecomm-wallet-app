const mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

process.env.DATABASE_URL =
  'mongodb://localhost:27017,localhost:27018,localhost:27019/societies_test?replicaSet=rs';

const establishConn = async () => {
  await mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, replicaSet: 'rs' }
  );
};

establishConn();
