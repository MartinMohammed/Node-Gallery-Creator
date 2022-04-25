// ----------- HTTP SERVER ----------

// ----------- "IMPORT" SECTION ----------
const express = require("express");
const path = require("path");
// allows us to create views () in express application
const hbs = require("express-handlebars");

// ---------- CONTANTS ---------- \\
const LOCAL_PORT = 3000;

// ---------- APP ------------
const app = express();
// TO PARSE INCOMING REQUESTS WITH JSON PAYLOADS (based upon bodyparser (= parsing bodies in incoming requests))
// .json() = a middleware of the express 'library'/module
app.use(express.json());

// serve static files (css, html)
// path.join(specified path segments => into one path)
app.use(express.static(path.join(__dirname, "public")));

// connect mongodb database - execute the connection function automatically
require("./server/database/database")();

// setup view engine - all extensions html file are .hbs
app.set("view engine", "hbs");
// initialize the engine/module
app.engine(
  "hbs",
  // make some configuration - specify file paths and etc.
  hbs.engine({
    extname: "hbs",
    // this property refers to main.hbs file = default file name as "layout"/ main file
    defaultView: "default",
    layoutsDir: path.join(__dirname, "views"),
    // partials in ejs are like headers/footers
    // templating are template files
    partialsDir: path.join(__dirname, "views/partials"),
  })
);

// calling routes - use get route in our server.js file
// import all the router related code inside here
app.use("/", require("./server/router/router"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log(`SERVER STARTED SUCCESSFULLY AT http://localhost:${LOCAL_PORT}`);
});
