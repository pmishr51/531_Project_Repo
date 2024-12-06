const graphdbClient = require("../config/db");

exports.getAllArt = async () => {
  const query = `
    PREFIX smw: <http://www.semanticweb.org/prana/ontologies/2024/10/ArtMuseum#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?createdAt ?createdBy ?hasDepartment ?hasDimension ?hasMedium ?storedAt ?acquiredThrough ?artifactTitle ?artifactUrl ?creationDate ?creditLine
WHERE {
    ?art rdf:type smw:Artwork ;
       smw:createdAt ?createdAt ;
       smw:createdBy ?createdBy ;
       smw:hasDepartment ?hasDepartment ;
       smw:hasDimension ?hasDimension ;
       smw:hasMedium ?hasMedium ;
       smw:storedAt ?storedAt ;
       smw:acquiredThrough ?acquiredThrough ;
       smw:artifactTitle ?artifactTitle ;
       smw:artifactUrl ?artifactUrl ;
       smw:creationDate ?creationDate ;
       smw:creditLine ?creditLine .
}
       LIMIT 10
  `;

  try {
    const response = await graphdbClient.query(query);

    const results = response.results.bindings.map((binding) => ({
      CreatedAt: binding.createdAt.value,
      CreatedBy: binding.createdBy.value,
      Department: binding.hasDepartment.value,
      Dimension: binding.hasDimension.value,
      Medium: binding.hasMedium.value,
      StoredAt: binding.storedAt.value,
      AcquiredThrough: binding.acquiredThrough.value,
      Title: binding.artifactTitle.value,
      URL: binding.artifactUrl.value,
      CreationDate: binding.creationDate.value,
      CreditLine: binding.creditLine.value,
    }));

    return results;
  } catch (error) {
    console.error("Error fetching artworks:", error.message);
    throw error;
  }
};

exports.searchArt = async (query) => {
  const { title, artist } = query;

  let sparqlQuery = `
    SELECT ?Title ?Medium ?CreationDate WHERE {
      ?art a :Artwork ;
           :Title ?Title ;
           :Medium ?Medium ;
           :CreationDate ?CreationDate .
  `;

  if (title)
    sparqlQuery += `FILTER(CONTAINS(LCASE(?Title), "${title.toLowerCase()}")) `;
  if (artist)
    sparqlQuery += `FILTER(CONTAINS(LCASE(?Artist), "${artist.toLowerCase()}")) `;

  sparqlQuery += `}`;

  const result = await graphdbClient.query.select(sparqlQuery);
  return result.results.bindings.map((binding) => ({
    Title: binding.Title.value,
    Medium: binding.Medium.value,
    CreationDate: binding.CreationDate.value,
  }));
};
