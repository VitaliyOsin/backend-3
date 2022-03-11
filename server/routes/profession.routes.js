const express = require("express");
const Profession = require("../models/Professions");
const cors = require("cors");
const { blockTC } = require("../utils/helpers");

const router = express.Router({ mergeParams: true });

router.get("/", cors(), async (req, res) => {
  blockTC(req, res, async () => {
    const list = await Profession.find();
    res.status(200).send(list);
  });
});

module.exports = router;
