// MONGO COLLECTION/MODEL
const UploadModel = require("../model/schema");
// fs build module = file systems helps us to store, access, and manage data on our operating system.
// we can also read, writeFile like in python
const fs = require("fs");

// controller for home route
exports.home = async (req, res) => {
  // get all data from UploadModel(uploads) collection
  const all_images = await UploadModel.find();

  // pass props/variables to template
  res.render("main", { images: all_images });
};

// -------------- THE COMPLETE UPLOAD PROCESS OF IMAGES TO STORE IT IN THE DATABASE ---------
exports.uploads = (req, res, next) => {
  // access all the images
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files");
    // set error property
    error.httpStatusCode = 4000;

    // call next function with error object
    return next(error);
  }

  // convert images base64 encoding -> into ascii character set aka 'string'
  // in base64 character set
  // this variable contains an array of base64 images
  let imgArray = files.map((file) => {
    // buffer data (puffer) => temporarily store data while it is being moved from one place to another
    // buffer image and store it in the variable
    let img = fs.readFileSync(file.path);

    // convert buffer to base64 string = big big big string
    return (encode_image = img.toString("base64"));
  });

  // src = data of each base64 image
  // ---------- FINAL OUTPUT:  return a promise as a response in array format---------

  let result = imgArray.map((src, index) => {
    // creaet object to store data in the collection/database
    let finalImage = {
      // iterate through the by the user uploaded array of images
      filename: files[index].originalname,
      // MIME TYPE/ EXTENSION = internet media type (label used to identify a type of data )
      contentType: files[index].mimetype,
      imageBase64: src,
    };
    // -------- store object in mongo database  (uploadModel is the Model from the schema file) -----
    // it creates new instance of the schema ("document" in mongo jargon)
    let newUpload = new UploadModel(finalImage);
    // save finally data
    return (
      // promise chaining
      newUpload
        .save()
        // when image was successfully uploaded have this message as a response
        .then(() => {
          return { msg: `${files[index].originalname} Uploaded Successfully` };
        })
        // if our promise was rejected/declined - catch the error
        // if no promise was rejected - then our promise was resolved
        .catch((error) => {
          if (error) {
            // the code refers to duplicate data in the mongo database
            if (error.name === "MongoError" && error.code === 11000) {
              return Promise.reject({
                error: `Duplicate ${files[index].originalname}. File Already exists!`,
              });
            } else {
              return Promise.reject({
                error:
                  error.message ||
                  "Cannot Upload  ${files[index].originalname} Something Missing.",
              });
            }
          }
        })
    );
  });

  // iterate over all promises and get the response
  Promise.all(result)
    // if all promises resolved
    .then((msg) => res.redirect("/"))
    .catch((err) => {
      res.json(err);
    });
};
