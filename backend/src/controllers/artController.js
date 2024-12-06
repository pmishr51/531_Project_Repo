const artService = require("../services/artServices");
const { validateArtQuery } = require("../validators/artValidators");

exports.getAllArt = async (req, res) => {
  try {
    const artData = await artService.getAllArt();
    res.status(200).json(artData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchArt = async (req, res) => {
  try {
    const { error } = validateArtQuery(req.query);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const artData = await artService.searchArt(req.query);
    res.status(200).json(artData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllArtists = async (req, res) => {
    try {
      const artistData = await artistService.getAllArtists();
      res.status(200).json(artistData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
