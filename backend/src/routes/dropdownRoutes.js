const express = require("express");
const router = express.Router();
const dropdownController = require("../controllers/dropdownController");

router.get("/artist", dropdownController.getArtists);
router.get("/department", dropdownController.getDepartments);
router.get("/medium", dropdownController.getMediums);
router.get("/country", dropdownController.getCountries);

module.exports = router;
