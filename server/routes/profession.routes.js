const express = require("express");
const Profession = require("../models/Professions");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Profession.find();
    res.status(200).send(list);
  } catch (err) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте зайти позже.",
    });
  }
});

module.exports = router;
