var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var movieSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      unique: false,
      required: true
    },
    verified: {
      type: Boolean,
      unique: false,
      required: true
    },
    verificationCode: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = movieSchema;
