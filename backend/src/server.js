const express = require("express");
const bodyParser = require("body-parser");
const env = require("./configs/env");
const user_auth = require("./apis/user_app/auth/auth.route");
const user_market = require("./apis/user_app/market/market.route");

const agent_auth = require("./apis/agent_app/auth/auth.route");

const admin_market = require("./apis/admin_app/market/market.route");

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, X-Requested-With, Range, Content-Type"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use(bodyParser.json());

user_auth.authRoutes(app);
user_market.marketRoutes(app);

agent_auth.authRoutes(app);

admin_market.marketRoutes(app);

//console.log("It reaches after routes");

//app.use('/uploads/business-images', express.static('uploads/business-images'));

app.listen(env.port, function () {
  console.log("app listening at port %s", env.port);
});
