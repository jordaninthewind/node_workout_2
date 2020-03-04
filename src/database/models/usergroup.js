
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: DataTypes.NUMBER,
    groupId: DataTypes.NUMBER,
  }, {});
  UserGroup.associate = function (models) {
    // UserGroup.belongsToMany()
  };
  return UserGroup;
};
