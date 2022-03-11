const express = require("express");
const cors = require("cors");

const Quality = require("../models/Quality");
const { blockTC } = require("../utils/helpers");

const router = express.Router({ mergeParams: true });

router.get("/", cors(), async (req, res) => {
  blockTC(req, res, async () => {
    const list = await Quality.find();
    res.status(200).send(list);
  });
});

module.exports = router;
