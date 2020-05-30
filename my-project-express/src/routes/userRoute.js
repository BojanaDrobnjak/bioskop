var Users = require("../controller/user.controller");

module.exports = function(router) {
  router.post("/create", Users.createUser);
  router.get("/get", Users.getUsers);
  router.get("/get/:id", Users.getUser);
  router.put("/update/:id", Users.updateUser);
  router.delete("/remove/:id", Users.removeUser);
  router.patch("/confirm-account", Users.confirmAccount);
  router.post("/auth", Users.login);
};
