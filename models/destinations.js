module.exports = function(sequelize, DataTypes) {
  var Destination = sequelize.define("Destination", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    }
  });

  Destination.associate = function(models) {
    // We're saying that a Destination should belong to an User
    // A Destination can't be created without an User due to the foreign key constraint
    Destination.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Destination;
};
