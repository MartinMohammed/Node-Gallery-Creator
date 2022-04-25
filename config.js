// .config() loads env file into process.env
require("dotenv").config();

const config = {
  MONGO_URI:
    // specify username/password/dbname
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.pqvdc.mongodb.net/uploader?retryWrites=true&w=majority`,
};

module.exports = config;
