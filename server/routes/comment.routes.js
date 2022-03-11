const express = require("express");
const cors = require("cors");
const auth = require("../middleware/auth.middleware");
const Comment = require("../models/Comment");
const { blockTC } = require("../utils/helpers");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    blockTC(req, res, async () => {
      const { orderBy, equalTo } = req.query;
      const list = await Comment.find({ [orderBy]: equalTo });
      res.send(list);
    });
  })
  .post(auth, async (req, res) => {
    blockTC(req, res, async () => {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newComment);
    });
  });

router.delete("/:commentId", auth, async (req, res) => {
  blockTC(req, res, async () => {
    const { commentId } = req.params;
    const removedComment = await Comment.findById(commentId);
    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.remove();
      return res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });
});

module.exports = router;
