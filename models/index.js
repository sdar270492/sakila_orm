const dbConfig = require("../config/db.config.js");


const { HOST, PORT, USER, PASSWORD, DB, dialect } = dbConfig;

console.log(`Data Config: ${DB}, ${USER}, ${PASSWORD}, ${HOST}, ${PORT}, ${dialect}`);


const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
  operatorsAliases: 0,
  port: PORT,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.countries = require("./country.model.js")(sequelize, Sequelize);

module.exports = db;