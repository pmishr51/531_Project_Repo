const graphdbClient = require("../config/graphdb");

exports.getAllArt = async () => {
  const query = `
    SELECT ?Title ?Medium ?CreationDate ?Museum ?Artist WHERE {
      ?art a :Artwork ;
           :Title ?Title ;
           :Medium ?Medium ;
           :CreationDate ?CreationDate ;
           :Museum ?Museum ;
           :Artist ?Artist .
    }
  `;
  const result = await graphdbClient.query.select(query);
  return result.results.bindings.map((binding) => ({
    Title: binding.Title.value,
    Medium: binding.Medium.value,
    CreationDate: binding.CreationDate.value,
    Museum: binding.Museum.value,
    Artist: binding.Artist.value,
  }));
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
