
dbPasswordDev ='mongodb://Zoe:pbywk%40mb%23123%23@cluster0-shard-00-01.2qyho.mongodb.net:27017/myFirstDatabase?authSource=admin&replicaSet=atlas-h5kba0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

module.exports = {
  mongoURI: dbPasswordDev,
  secret: 'yourSecretKey',
};
