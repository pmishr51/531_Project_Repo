const graphdbClient = require("../config/db");

exports.getAllMediums = async () => {
  try {
    const query = `
    PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT DISTINCT ?mediumName
    WHERE {
        ?artwork rdf:type art:Artwork ;
                 art:hasMedium ?medium .
        ?medium rdf:type art:Medium ;
                art:mediumName ?mediumName .
    }
    ORDER BY ?mediumName
    OFFSET 290
    LIMIT 100
    `;

    const response = await graphdbClient.query(query);

    return response.results.bindings.map((binding) => binding.mediumName.value);
  } catch (error) {
    console.error("Error fetching mediums with artworks:", error.message);
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
        ?artwork rdf:type art:Artwork ;
                 art:createdAt ?country .
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
    console.error("Error fetching countries with artworks:", error.message);
    throw error;
  }
};

exports.getAllArtists = async () => {
  try {
    const queryArtistsWithArtworks = `
    PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT DISTINCT ?artist
    WHERE {
        ?artwork rdf:type art:Artwork ;
                 art:createdBy ?artist .
    }
    LIMIT 200
    `;

    const artistWithArtworkResponse = await graphdbClient.query(
      queryArtistsWithArtworks
    );
    const artistURIs = artistWithArtworkResponse.results.bindings.map(
      (binding) => binding.artist.value
    );

    if (artistURIs.length === 0) {
      return [];
    }

    const artistIDs = artistURIs.map((uri) => {
      const idWithDecimal = uri.split("#")[1];
      const id = idWithDecimal.split(".")[0];
      return `art:${id}`;
    });

    const artistFilter = artistIDs.join(" ");
    const queryArtistNames = `
    PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT DISTINCT ?artistName
    WHERE {
        VALUES ?artist { ${artistFilter} }
        ?artist rdf:type art:Artist ;
                art:artistName ?artistName .
    }
    `;

    const artistNameResponse = await graphdbClient.query(queryArtistNames);

    return artistNameResponse.results.bindings.map(
      (binding) => binding.artistName.value
    );
  } catch (error) {
    console.error("Error fetching artists with artworks:", error.message);
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
        ?artwork rdf:type art:Artwork ;
                 art:hasDepartment ?department .
        ?department rdf:type art:Department ;
                    art:departmentName ?departmentName .
    }
    ORDER BY ?departmentName
    LIMIT 100
    OFFSET 5
    `;

    const response = await graphdbClient.query(query);

    return response.results.bindings.map(
      (binding) => binding.departmentName.value
    );
  } catch (error) {
    console.error("Error fetching departments with artworks:", error.message);
    throw error;
  }
};
