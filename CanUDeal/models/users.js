module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    user_name: DataTypes.STRING
  });

  User.associate = function(models) {
    // Associating User with Posts
    // When an User is deleted, also delete any associated Posts
    User.hasMany(models.Destination, {
      onDelete: "cascade" // Deletes all posts from User.
    });
  };

  return User;
};
