const multer = require("multer");

// set/initialize storage - where we want to store our images/files
var storage = multer.diskStorage({
  // specify where we want to upload all our images
  destination: function (req, file, cb) {
    /* callback
    (null -> do smth (mostly pass error message) when user uploaded something wrong )
    (-folder where we store our images - relative from root dir)
    */
    cb(null, "uploads");
  },
  // receive image.jpg just rename that image and specify different name to it
  //    - for unique name for all our images
  filename: function (req, file, cb) {
    // access the uploaded file extension on the uploaded computer
    // image.jpg (file.originalname.last --> index where the last "." occurrence and take the substring from that to end)
    var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    // fieldname = images
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});
// inform multer module to set this configuration (the actual initialization process)
// export store object from this module

const store = multer({
  storage,
});
module.exports = store;
