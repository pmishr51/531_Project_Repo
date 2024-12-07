const graphdbClient = require("../config/db");

exports.getAllArtByArtist = async (filters) => {
  const { artistName } = filters;

  const queryInteger = `
  PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

  SELECT ?artist
  WHERE {
      ?artist rdf:type art:Artist ;
              art:artistName "${artistName}" .
  }
  LIMIT 1
  `;

  try {
    const artistResponse = await graphdbClient.query(queryInteger);
    if (!artistResponse.results.bindings.length) {
      throw new Error("Artist not found.");
    }

    const artistUri = artistResponse.results.bindings[0].artist.value;
    const prefix = "art:";
    const artistId = artistUri.split("#")[1];
    const formattedArtist = `${prefix}${parseFloat(artistId).toFixed(1)}`;
    console.log(formattedArtist);

    const queryFloat = `
    PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?artwork ?title ?departmentName ?mediumName ?acquiredThrough ?countryName
    WHERE {
        ?artwork rdf:type art:Artwork ;
                 art:artifactTitle ?title ;
                 art:hasDepartment ?department;
                 art:hasMedium ?medium;
                 art:acquiredThrough ?acquired;
                 art:createdAt ?country;
                 art:createdBy ${formattedArtist} .
                 ?department art:departmentName ?departmentName.
    				     ?medium art:mediumName ?mediumName.
                 ?acquired art:acquisitionDetails ?acquiredThrough.
                 ?country art:artworkCountry ?countryName.
    }
    ORDER BY ?title
    LIMIT 100
    `;

    const artworkResponse = await graphdbClient.query(queryFloat);

    const results = artworkResponse.results.bindings.map((binding) => ({
      artwork: binding.artwork.value,
      title: binding.title.value,
      department: binding.departmentName.value,
      medium: binding.mediumName.value,
      acquiredThrough: binding.acquiredThrough.value,
      country: binding.countryName.value,
      artist: artistName,
    }));

    return results;
  } catch (error) {
    console.error("Error fetching artworks:", error.message);
    throw error;
  }
};

exports.getAllArtByDepartment = async (filters) => {
  const { departmentName } = filters;

  try {
    const queryArtworks = `
    PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?artwork ?title ?mediumName ?artist
    WHERE {
        ?department art:departmentName "${departmentName}" .
        ?artwork rdf:type art:Artwork ;
                art:artifactTitle ?title ;
                art:hasMedium ?medium ;
                art:hasDepartment ?department ;
                art:createdBy ?artist .

        ?medium art:mediumName ?mediumName .
    }
    ORDER BY ?title
    LIMIT 100
    `;

    const artworkResponse = await graphdbClient.query(queryArtworks);

    const results = await Promise.all(
      artworkResponse.results.bindings.map(async (binding) => {
        const artistUri = binding.artist.value;
        const artistId = artistUri.split("#")[1].split(".")[0];

        const artistQuery = `
        PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

        SELECT ?artistName
        WHERE {
            art:${artistId} art:artistName ?artistName .
        }
        LIMIT 1
        `;

        const artistResponse = await graphdbClient.query(artistQuery);

        const artistName =
          artistResponse.results.bindings.length > 0
            ? artistResponse.results.bindings[0].artistName.value
            : "Unknown Artist";

        return {
          artwork: binding.artwork.value,
          title: binding.title.value,
          medium: binding.mediumName.value,
          department: departmentName,
          artist: artistName,
        };
      })
    );

    return results;
  } catch (error) {
    console.error("Error fetching artworks by department:", error.message);
    throw error;
  }
};

exports.getAllArtByMedium = async (filters) => {
  const { mediumName } = filters;

  try {
    const queryArtworks = `
    PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?artwork ?title ?artist ?departmentName
    WHERE {
        ?medium art:mediumName "${mediumName}" .
        ?artwork rdf:type art:Artwork ;
                art:artifactTitle ?title ;
                art:hasMedium ?medium ;
                art:createdBy ?artist ;
                art:hasDepartment ?department .

        ?department art:departmentName ?departmentName .
    }
    ORDER BY ?title
    LIMIT 100
    `;

    const artworkResponse = await graphdbClient.query(queryArtworks);

    const results = await Promise.all(
      artworkResponse.results.bindings.map(async (binding) => {
        const artistUri = binding.artist.value;
        const artistId = artistUri.split("#")[1].split(".")[0];

        const artistQuery = `
        PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

        SELECT ?artistName
        WHERE {
            art:${artistId} art:artistName ?artistName .
        }
        LIMIT 1
        `;

        const artistResponse = await graphdbClient.query(artistQuery);

        const artistName =
          artistResponse.results.bindings.length > 0
            ? artistResponse.results.bindings[0].artistName.value
            : "Unknown Artist";

        return {
          artwork: binding.artwork.value,
          title: binding.title.value,
          medium: mediumName,
          department: binding.departmentName.value,
          artist: artistName,
        };
      })
    );

    return results;
  } catch (error) {
    console.error("Error fetching artworks by medium:", error.message);
    throw error;
  }
};

exports.getAllArtByCountry = async (filters) => {
  const { countryName } = filters;

  try {
    const queryArtworks = `
    PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?artwork ?title ?artist ?mediumName ?departmentName
    WHERE {
        ?country art:artworkCountry "${countryName}" .
        ?artwork rdf:type art:Artwork ;
                art:artifactTitle ?title ;
                art:createdBy ?artist ;
                art:hasMedium ?medium ;
                art:hasDepartment ?department ;
                art:createdAt ?country .

        ?medium art:mediumName ?mediumName .
        ?department art:departmentName ?departmentName .
    }
    ORDER BY ?title
    LIMIT 100
    `;

    const artworkResponse = await graphdbClient.query(queryArtworks);

    const results = await Promise.all(
      artworkResponse.results.bindings.map(async (binding) => {
        const artistUri = binding.artist.value;
        const artistId = artistUri.split("#")[1].split(".")[0];

        const artistQuery = `
        PREFIX art: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

        SELECT ?artistName
        WHERE {
            art:${artistId} art:artistName ?artistName .
        }
        LIMIT 1
        `;

        const artistResponse = await graphdbClient.query(artistQuery);

        const artistName =
          artistResponse.results.bindings.length > 0
            ? artistResponse.results.bindings[0].artistName.value
            : "Unknown Artist";

        return {
          artwork: binding.artwork.value,
          title: binding.title.value,
          country: countryName,
          medium: binding.mediumName.value,
          department: binding.departmentName.value,
          artist: artistName,
        };
      })
    );

    return results;
  } catch (error) {
    console.error("Error fetching artworks by country:", error.message);
    throw error;
  }
};
