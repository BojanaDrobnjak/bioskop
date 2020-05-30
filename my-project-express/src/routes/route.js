var Movies = require("../controller/movie.controller");

module.exports = function(router) {
  router.post("/create", Movies.createMovie);
  router.get("/get", Movies.getMovies);
  router.get("/get/:id", Movies.getMovie);
  router.put("/update/:id", Movies.updateMovie);
  router.delete("/remove/:id", Movies.removeMovie);
};
