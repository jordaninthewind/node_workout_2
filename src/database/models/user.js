module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: DataTypes.STRING,
    age: DataTypes.INTEGER,
    password: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
  }, {});
  User.associate = function (models) {
    User.belongsToMany(models.Group, {
      through: 'UserGroups',
      as: 'groups',
      foreignKey: 'userId',
      otherKey: 'groupId',
    });
  };
  return User;
};
