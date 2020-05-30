var Movies = require("../repository/movie.repository");

exports.createMovie = function(req, res, next) {
  var movie = {
    title: req.body.title,
    year: req.body.year,
    imgUrl: req.body.imgUrl
  };

  Movies.create(movie, function(err, movie) {
    console.log(movie, "movie");
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Movie created successfully"
    });
  });
};

exports.getMovies = function(req, res, next) {
  Movies.get({}, function(err, movies) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      movies: movies
    });
  });
};

exports.getMovie = function(req, res, next) {
  Movies.get({ _id: req.params.id }, function(err, movies) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      movies
    });
  });
};

exports.updateMovie = function(req, res, next) {
  var movie = {
    title: req.body.title,
    year: req.body.year,
    imgUrl: req.body.imgUrl
  };
  Movies.update({ _id: req.params.id }, movie, function(err, movie) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Movie updated successfully"
    });
  });
};

exports.removeMovie = function(req, res, next) {
  Movies.delete({ _id: req.params.id }, function(err, movie) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "Movie deleted successfully"
    });
  });
};
