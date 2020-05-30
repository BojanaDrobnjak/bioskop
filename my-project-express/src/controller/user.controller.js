var Users = require("../repository/user.repository");
var UserService = require("./service/user.service");
var EmailService = require("./service/email.service");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.createUser = function(req, res, next) {
  var user = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    verified: false,
    verificationCode: UserService.generateRandomCode()
  };

  Users.create(user, function(err, user) {
    console.log(user, " user");
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "User created successfully"
    });
  });
  EmailService.sendConfirmationEmail(user.email, user.verificationCode);
};

exports.getUsers = function(req, res, next) {
  Users.get({}, function(err, users) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      users
    });
  });
};

exports.getUser = function(req, res, next) {
  Users.get({ _id: req.params.id }, function(err, users) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      users
    });
  });
};

exports.updateUser = function(req, res, next) {
  var user = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
  Users.update({ _id: req.params.id }, user, function(err, user) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "User updated successfully"
    });
  });
};

exports.removeUser = function(req, res, next) {
  Users.delete({ _id: req.params.id }, function(err, user) {
    if (err) {
      res.json({
        error: err
      });
    }
    res.json({
      message: "User deleted successfully"
    });
  });
};

exports.confirmAccount = function(req, res, next) {
  Users.get({ verificationCode: req.body.code }, (err, user) => {
    if (err) {
      console.log("getUserByConfirmationCode error: ", err);
      res.json({
        error: err
      });
    } else if (user) {
      console.log("user is: ", user);
      user[0].verified = true;
      Users.update({ _id: user[0]._id }, user[0], function(err, userObject) {
        if (err) {
          res.json({
            error: err
          });
        } else {
          console.log("userObject ", userObject);
          res.json({
            message: "Account confirmed successfully!"
          });
        }
      });
    }
  });
};

exports.login = function(req, res) {
  Users.get({ username: req.body.username }, function(err, user) {
    if (err) {
      res.json({
        error: err
      });
    } else {
      if (!user[0] || user[0].password !== req.body.password) {
        return res.sendStatus(401);
      }

      var token = jwt.sign(
        { id: user[0]._id, role: "adsasdasd" },
        "todo-app-super-shared-secret",
        {
          expiresIn: "2h"
        }
      );
      res.send({ token });
    }
  });
};
