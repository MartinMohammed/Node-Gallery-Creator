const mongoose = require("mongoose");
const config = require("../../config");

const Connect = async () => {
  try {
    // mongodb cloud connection
    // first arg = mongodb uri
    const con = await mongoose.connect(config.MONGO_URI, {
      // specifying properties for avoiding unwanted error messages in the console message
      // --> outdated
      //   useNewUrlParse: true,
      //   useUnifiedTropology: true,
      //   useFindAndModify: false,
      //   useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = Connect;
