require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const logger = require('morgan');


module.exports = {

  init(app, express){

    app.use(logger('dev'));

  }
};
