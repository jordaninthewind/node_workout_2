
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    permissions: DataTypes.ARRAY(DataTypes.STRING),
  }, {});
  Group.associate = function (models) {
    // associations can be defined here
  };
  return Group;
};
