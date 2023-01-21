const express = require("express");
const router = express.Router();
const authCheck = require("../middleware/authCheck");
const PotholeModel = require("../../models/Pothole.model");

router.post("/potholedata", authCheck, async (req, res, next) => {
  try {
    let potholes = await PotholeModel.find({Verified: true}).populate("by", ["Username", "Phone", "reward"]);
    res.status(200).json({ potholes: potholes });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
