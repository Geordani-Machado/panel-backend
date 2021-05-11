
dbPasswordDev ='mongodb://Zoe:pbywk%40mb%23123%23@cluster0-shard-00-01.2qyho.mongodb.net:27017/myFirstDatabase?authSource=admin&replicaSet=atlas-h5kba0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

// for PRODUCTION
// const MONGO_USERNAME = 'sammy';
// const MONGO_PASSWORD = 'your_password';
// const MONGO_HOSTNAME = '127.0.0.1';
// const MONGO_PORT = '27017';
// const MONGO_DB = 'sharkinfo';

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

module.exports = {
  mongoURI: dbPasswordDev,
  secret: 'yourSecretKey',
};
