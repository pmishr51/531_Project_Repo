const express = require("express");
const router = express.Router();
const artController = require("../controllers/artController");

router.get("/", artController.getAllArt);
router.get("/search", artController.searchArt);

module.exports = router;
