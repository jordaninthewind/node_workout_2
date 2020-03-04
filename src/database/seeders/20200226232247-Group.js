
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Groups', [{
    name: 'Friends',
    permissions: ['READ', 'UPDATE'],
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Groups', null, {}),
};
