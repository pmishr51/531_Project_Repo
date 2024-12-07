const express = require("express");
const router = express.Router();
const artController = require("../controllers/artController");

router.get("/artist", artController.getAllArtByArtist);
router.get("/department", artController.getAllArtByDepartment);
router.get("/medium", artController.getAllArtByMedium);
router.get("/country", artController.getAllArtByCountry);

module.exports = router;
