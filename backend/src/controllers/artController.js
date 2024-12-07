const artService = require("../services/artServices");
const { validateArtQuery } = require("../validators/artValidators");

exports.getAllArtByArtist = async (req, res) => {
  try {
    const filter = req.query;
    const artData = await artService.getAllArtByArtist(filter);
    res.status(200).json(artData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllArtByDepartment = async (req, res) => {
  try {
    const filter = req.query;
    const artData = await artService.getAllArtByDepartment(filter);
    res.status(200).json(artData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllArtByMedium = async (req, res) => {
  try {
    const filter = req.query;
    const artData = await artService.getAllArtByMedium(filter);
    res.status(200).json(artData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllArtByCountry = async (req, res) => {
  try {
    const filter = req.query;
    const artData = await artService.getAllArtByCountry(filter);
    res.status(200).json(artData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
