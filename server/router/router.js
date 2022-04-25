// ----------- PRINCIPLE OF CONCERN SEPERATION ---------

// create different Route in the route file
const route = require("express").Router();
const controller = require("../controller/controller");
const store = require("../middleware/multer");

// ----------- "ROUTE" SECTION ----------
// "route chaining"
route.get("/", controller.home);

// get all images inputed from the input type field from index.hbs with the name 'images'
// and put them inside our upload folder
// * array for multiple/ single for single image, limit the user for only inputing 12 files simultaneously

// padd middleware as 2nd argument which will have access to req,res cycle and add new property
// in req object with the images we want and call the 'next' middleware
route.post("/uploadmultiple", store.array("images", 12), controller.uploads);

// export the route instance
module.exports = route;
