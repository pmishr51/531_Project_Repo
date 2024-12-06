const axios = require("axios");

const endpointUrl =
  process.env.GRAPHDB_URI || "http://localhost:7200/repositories/project";

const graphdbClient = {
  query: async (sparqlQuery) => {
    console.log("SPARQL Query:", sparqlQuery);
    console.log("Endpoint URL:", endpointUrl);
    try {
      const response = await axios.post(endpointUrl, sparqlQuery, {
        headers: {
          "Content-Type": "application/sparql-query",
          Accept: "application/sparql-results+json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "SPARQL Query Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

module.exports = graphdbClient;
