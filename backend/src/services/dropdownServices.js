const graphdbClient = require("../config/db");

exports.getAllMediums = async () => {
  try {
    const query = `
    PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT DISTINCT ?mediumName
    WHERE {
        ?medium rdf:type art:Medium ;
                art:mediumName ?mediumName .
    }
    OFFSET 290
    LIMIT 100
    `;

    const response = await graphdbClient.query(query);

    return response.results.bindings.map((binding) => binding.mediumName.value);
  } catch (error) {
    console.error("Error fetching mediums:", error.message);
    throw error;
  }
};

exports.getAllCountries = async () => {
  try {
    const query = `
    PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT DISTINCT ?countryName
    WHERE {
        ?country rdf:type art:Country ;
                 art:artworkCountry ?countryName .
    }
    ORDER BY ?countryName
    OFFSET 500
    LIMIT 300
    `;

    const response = await graphdbClient.query(query);

    return response.results.bindings.map(
      (binding) => binding.countryName.value
    );
  } catch (error) {
    console.error("Error fetching countries:", error.message);
    throw error;
  }
};

exports.getAllArtists = async () => {
  try {
    const query = `
    PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT DISTINCT ?artistName
    WHERE {
        ?artist rdf:type art:Artist ;
                art:artistName ?artistName .
    }
    ORDER BY ?artistName
    LIMIT 200
    `;

    const response = await graphdbClient.query(query);

    return response.results.bindings.map((binding) => binding.artistName.value);
  } catch (error) {
    console.error("Error fetching artists:", error.message);
    throw error;
  }
};

exports.getAllDepartments = async () => {
  try {
    const query = `
    PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT DISTINCT ?departmentName
    WHERE {
        ?department rdf:type art:Department ;
                    art:departmentName ?departmentName .
    }
    ORDER BY ?departmentName
    LIMIT 100
    `;

    const response = await graphdbClient.query(query);

    return response.results.bindings.map(
      (binding) => binding.departmentName.value
    );
  } catch (error) {
    console.error("Error fetching departments:", error.message);
    throw error;
  }
};
