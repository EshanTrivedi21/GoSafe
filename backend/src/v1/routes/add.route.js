const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authCheck = require("../middleware/authCheck");
const User = require("../../models/User.model");
const Pothole = require("../../models/Pothole.model");
const fs = require("fs");
const { v4: uuid } = require("uuid");

router.post("/pothole", authCheck, async (req, res, next) => {
  try {
    if (req.user) {
      const { lat, lng, Problem } = req.body;
      const file = req.body.Image;
      if (!(lat && lng && file && Problem)) {
        return res.status(400).json({ err: "All input is required" });
      }
      let folder = "potholes/";
      let Fileid = uuid();
      // var fileExt = file.name.split(".").pop();
      var fileExt = "png";
      while (
        fs.existsSync("./public/usercontent/" + folder + Fileid + "." + fileExt)
      ) {
        Fileid = uuid();
      }
      fs.writeFile(
        "./public/usercontent/" + folder + Fileid + "." + fileExt,
        file,
        "base64",
        async function (err) {
          if (err) {
            return console.log(err);
          }
          let user = await User.findById(req.user.user_id);
          const pothole = await Pothole.create({
            lat,
            lng,
            Image: "/usercontent/" + folder + Fileid + "." + fileExt,
            Problem,
            by: req.user.user_id,
          });
          user.reward += 10;
          user.save();
          res.status(200).json({ err: null });
        }
      );
      // file.mv(
      //   "./public/usercontent/" + folder + Fileid + "." + fileExt,
      //    async (error) => {
      //     if (error) {
      //       return res.status(500).json({ err: error.message });
      //     }
      //     const pothole = await Pothole.create({
      //         lat,
      //         lng,
      //         Image: "/usercontent/" + folder + Fileid + "." + fileExt,
      //         Problem,
      //         by: req.user._id,
      //     })
      //     let user = await User.findById(req.user.user_id)
      //     user.reward += 10;
      //     user.save();
      //     res.status(200).json({ err: null });
      //   }
      // );
      // var base64Data = file.replace(/^data:image\/png;base64,/, "");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});
module.exports = router;
