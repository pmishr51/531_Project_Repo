const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artController");

router.get("/", artistController.getAllArtists);

module.exports = router;
