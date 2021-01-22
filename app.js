const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/adminRoutes.js");
const shopRoutes = require("./routes/shopRoutes.js");
const errorController = require("./controllers/errorController");
const { mongoConnect } = require("./util/database");

const User = require("./models/userModel");

const app = express();
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findUserById("6009d9979cfc269cc26a216b")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      res.redirect("/error");
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use("/error", errorController.getError);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
