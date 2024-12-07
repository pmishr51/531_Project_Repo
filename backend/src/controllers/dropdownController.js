const {
  getAllMediums,
  getAllArtists,
  getAllDepartments,
  getAllCountries,
} = require("../services/dropdownServices");

exports.getMediums = async (req, res) => {
  try {
    const mediums = await getAllMediums();
    res.status(200).json({ success: true, data: mediums });
  } catch (error) {
    console.error("Error in getMediums controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch mediums" });
  }
};

exports.getCountries = async (req, res) => {
  try {
    const countries = await getAllCountries();
    res.status(200).json({ success: true, data: countries });
  } catch (error) {
    console.error("Error in getCountries controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch countries" });
  }
};

exports.getArtists = async (req, res) => {
  try {
    const artists = await getAllArtists();
    res.status(200).json({ success: true, data: artists });
  } catch (error) {
    console.error("Error in getArtists controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch artists" });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await getAllDepartments();
    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    console.error("Error in getDepartments controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch departments" });
  }
};
