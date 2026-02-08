const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const SCHEMA_PATH = path.join(__dirname, '..', 'database', 'schema.sql');
const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');

function createTestDb() {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  db.exec(schema);
  return db;
}

function mockGetDb(db) {
  const connection = require('../database/connection');
  jest.spyOn(connection, 'getDb').mockReturnValue(db);
}

module.exports = { createTestDb, mockGetDb };
