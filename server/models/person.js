module.exports = function(sequelize, DataTypes) {
  const Person = sequelize.define('person', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  })

  Person.associate = (models) => Person.hasMany(models.post)

  return Person
}


