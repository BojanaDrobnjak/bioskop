var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var movieSchema = new Schema(
  {
    title: {
      type: String,
      unique: false,
      required: true
    },
    year: {
      type: Number,
      unique: false,
      required: true
    },
    imgUrl: {
      type: String,
      unique: false,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = movieSchema;
