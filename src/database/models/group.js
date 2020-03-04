
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    permissions: DataTypes.ARRAY(DataTypes.STRING),
  }, {});
  Group.associate = function (models) {
    Group.belongsToMany(models.User, {
      through: 'UserGroups',
      as: 'users',
      foreignKey: 'groupId',
      otherKey: 'userId',
    });
  };
  return Group;
};
