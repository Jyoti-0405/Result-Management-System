var config = {};
config.bodyParserLimit = 10000;
config.RESULT_DB_HOST = process.env.RESULT_DB_HOST;
config.RESULT_DB_SCHEMA = process.env.RESULT_DB_SCHEMA;
config.RESULT_DB_USERNAME = process.env.RESULT_DB_USERNAME;
config.RESULT_DB_PASSWORD = process.env.RESULT_DB_PASSWORD;
config.RESULT_DB_PORT = process.env.RESULT_DB_PORT;
config.BCRYPT_SALT_ROUNDS = 10;
config.JWT_SIGNING_KEY = process.env.JWT_SIGNING_KEY;
config.SERVER_HOST = process.env.SERVER_HOST;
config.SERVER_PROTOCOL = process.env.SERVER_PROTOCOL;
config.SERVER_PORT = process.env.SERVER_PORT;
config.CLIENT_PORT = process.env.CLIENT_PORT;
config.RESULT_CLIENT_HOST = process.env.RESULT_CLIENT_HOST;
config.NODE_ENV = process.env.NODE_ENV;
config.database = process.env.RESULT_DB_SCHEMA;
config.username = process.env.RESULT_DB_USERNAME;
config.password = process.env.RESULT_DB_PASSWORD;
config.port = process.env.RESULT_DB_PORT;
config.dialect = process.env.DIALECT;
config.host = process.env.SERVER_HOST;
config.MODEL_SYNC = process.env.MODEL_SYNC;
config.ISSUER = process.env.ISSUER;

var missingKeys = [];
Object.keys(config).forEach((key) => {
  if (!config[key]) {
    missingKeys.push(key);
  }
});

if (missingKeys.length > 0) {
  console.log(
    "***** IMPORTANT - The following environment variables must be set before running the server: "
  );
  console.log(missingKeys);
  console.log("      Exiting process");
  process.exit(1);
}

module.exports = config;
