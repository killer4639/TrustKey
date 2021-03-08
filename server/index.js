const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
dotenv.config();
const app = express();
const LocalStrategy = require("passport-local");
const passport = require("passport");
const User = require("./models/user");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/trust-key";
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.set("useFindAndModify", false);
app.use(
  express.urlencoded({
    extended: true,
  })
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const secret = process.env.SECRET || "thisishivagupta";
const sessionConfig = {
  name: "session",
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure:true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
  /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "POST");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Pass to next layer of middleware
  next();
});
app.get("/", (req, res) => {
  res.send("API running");
});
app.get("/fakeUser", async (req, res) => {
  await User.deleteMany({});
  const user = new User({
    email: "shivaspta@gmail.com",
    company: "shivgupta",
    username: "Supta",
  });
  await user.setPassword("password");
  await user.save();
  // const newUser = await User.register(user, "shiva");
  // await newUser.save();
  const temp = await User.findOne({});
  res.send(temp);
});
app.post("/signup", async (req, res) => {
  const { username, email, company, password } = req.body;
  const user = new User({
    email: email,
    company: company,
    username: username,
  });
  await user.setPassword(password);
  await user.save();
  return user;
  res.send(user);
});
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Something went Wrong";
  }
  res.status(statusCode).send(err);
  //   res.status(statusCode).render("error", {
  //     err,
  //   });
});
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
