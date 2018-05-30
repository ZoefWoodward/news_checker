require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const logger = require('morgan');
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");


module.exports = {

  init(app, express){

    app.use(logger('dev'));
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(expressValidator());
    app.use(session({
      secret: process.env.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }));
    app.use(flash());

  }

};
