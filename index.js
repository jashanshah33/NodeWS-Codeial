const express = require("express");
const env = require('./config/environment')
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require('./config/passport-jwt-strategy')
const passportGoogle = require('./config/passport-google-Oauth-strategy')
// const MongoStore = require("connect-mongo")(session); did't work
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const custonMware = require("./config/middleware");

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat-sockets').chatSockets(chatServer);
chatServer.listen(5000)
console.log('chat server is listening on Port 5000');

const path = require('path')

if (env.name == 'development') {
  app.use(
    sassMiddleware({
      src: path.join(__dirname,'/' , env.asset_path, '/scss') ,
      dest: path.join(__dirname,'/' , env.asset_path, '/css'),
      debug: true,
      outputStyle: "expanded",
      prefix: "/css",
    })
  );
}

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(env.asset_path));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "socialBook",
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongoUrl: "mongodb://localhost/session",
        // mongooseConnection: db,  did't work
        autoRemove: "disabled",
      },
      function (err) {
        return console.log(err || "connect mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(custonMware.setFlash);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
    return;
  }
  console.log("Running Sucessfully on port", port);
});
