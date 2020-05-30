var express = require("express");
var cors = require("cors");
var properties = require("./config/properties");
var db = require("./config/connection");
var log = require("morgan")("dev");
var bodyParser = require("body-parser");
var moviesRoutes = require("./src/routes/route");
var userRoutes = require("./src/routes/userRoute");
const expressJwt = require("express-jwt");

var app = express();
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });
var movieRouter = express.Router();
var userRouter = express.Router();
app.use(cors());
db();
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});

app.use(
  expressJwt({ secret: "todo-app-super-shared-secret" }).unless({
    path: ["/user/auth", "/user/create", "/user/confirm-account"]
  })
);
//namesti da se ignorisu i rute za registraciju i confirm-acc

// use express router
app.use("/movie", movieRouter);
//call movies routing
moviesRoutes(movieRouter);
//set user routing
app.use("/user", userRouter);
//call user routing
userRoutes(userRouter);

app.listen(properties.PORT, (request, result) => {
  console.log(`port is: ${properties.PORT}`);
});
