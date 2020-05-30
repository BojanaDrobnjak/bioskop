var mongoose = require("mongoose");
var movieSchema = require("../model/movie.model");

movieSchema.statics = {
  create: function(data, cb) {
    var movie = new this(data);
    movie.save(cb);
  },

  get: function(query, cb) {
    this.find(query, cb);
  },

  getByName: function(query, cb) {
    this.find(query, cb);
  },

  update: function(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function(query, cb) {
    this.findOneAndDelete(query, cb);
  }
};

var movieModel = mongoose.model("Movies", movieSchema);
module.exports = movieModel;
