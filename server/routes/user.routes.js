const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const { blockTC } = require("../utils/helpers");

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  blockTC(req, res, async () => {
    const list = await User.find();
    res.status(200).send(list);
  });
});

router.patch("/:userId", auth, async (req, res) => {
  blockTC(req, res, async () => {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });
});

module.exports = router;
