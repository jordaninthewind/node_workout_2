
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    login: 'Paul',
    age: 56,
    password: 'default',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('People', null, {}),
};
