require("dotenv").config();
require("./src/v1/database/database.config").connect();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const fileupload = require("express-fileupload");
const version = "v1";
const auth = require(`./src/${version}/routes/auth.route`);
const cors = require("cors");
const url = require("./url.json");
const port = 4000;
app.use(fileupload());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public", { maxAge: 3600000 }));
app.use(function (req, res, next) {
  res.setHeader("x-powered-by", "inspectElements");
  next();
});
app.use(
  cors({
    origin: `http://${url.frontend}`,
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "Server up" });
});
app.use("/api/auth/", auth);
app.use("/api/add/", require(`./src/${version}/routes/add.route`));
app.use("/api/get/", require(`./src/${version}/routes/get.route`));

app.listen(port, () => {
  console.log(`Example app listening at http://${url.server}`);
});
