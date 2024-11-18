const neo4j = require('neo4j-driver');
require('dotenv').config();

const driver = neo4j.driver(
  process.env.GRAPHDB_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(process.env.GRAPHDB_USER || 'neo4j', process.env.GRAPHDB_PASSWORD || 'password')
);

const session = driver.session();

module.exports = { driver, session };
