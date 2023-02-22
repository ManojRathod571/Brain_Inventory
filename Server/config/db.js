const mongoose = require("mongoose");

module.exports = connection = () => {
  return mongoose.connect(process.env.DBURL);
};
