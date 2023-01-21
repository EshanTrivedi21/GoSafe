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
      let pothole = await Pothole.create({
        lat,
        lng,
        Image: "/usercontent/",
        Problem,
        by: req.user.user_id,
      });
      pothole.Image = "/usercontent/" + folder + pothole._id + "." + fileExt,
      pothole.save();
      fs.writeFile(
        "./public/usercontent/" + folder + pothole._id + "." + fileExt,
        file,
        "base64",
        async function (err) {
          if (err) {
            return console.log(err);
          }
          let user = await User.findById(req.user.user_id);
          
          user.reward += 10;
          user.save();
          res.status(200).json({ err: null });
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});
router.post("/update", authCheck, async (req, res, next) => {
  if(req.user){
    try{
      const id = req.body.id;
      const pothole = await Pothole.findOne({_id: id});
      if(pothole){
        if(pothole.assigned) pothole.assigned = false;
        else pothole.assigned = true;
        pothole.save();
        res.status(200).json({err: null});
      }
      else{
        res.status(400).json({err: "Pothole not found"});
      }
    }
    catch (err){
      res.status(500).json({err: err.message});
    }
  }
});
module.exports = router;
