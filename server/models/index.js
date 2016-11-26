const fs        = require('fs')
const path      = require('path')
const Sequelize = require('sequelize')
const basename  = path.basename(module.filename)

const db        = {}
const DB_NAME   = process.env.POSTGRES_DB || 'relay'
const DB_USER   = process.env.POSTGRES_USER || 'postgres'
const DB_PASSWD = process.env.POSTGRES_PASSWORD || 'postgres'

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWD, {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.')
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err)
  })

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
