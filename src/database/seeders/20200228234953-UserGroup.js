
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('UserGroups', [{
    userId: 1,
    groupId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('UserGroups', null, {}),
};
