const express = require("express");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {});

router.patch("/:id", async (req, res) => {});

module.exports = router;
