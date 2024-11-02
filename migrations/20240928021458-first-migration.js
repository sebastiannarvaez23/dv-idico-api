const { EncryptionUtil } = require('../dist/lib-core/utils/encryption.util');

const { createTableCharacters } = require('./tables/characters.js');
const { createTableKinds } = require('./tables/kinds.js');
const { createTableGenders } = require('./tables/genders.js');
const { createTableOAuthClients } = require('./tables/oauth-clients.js');
const { createTablePersons } = require('./tables/persons.js');
const { createTableProducts } = require('./tables/products.js');
const { createTableRoles } = require('./tables/roles.js');
const { createTableRolesServices } = require('./tables/roles-services.js');
const { createTableServices } = require('./tables/services.js');
const { createTableUsers } = require('./tables/users.js');

const { bulkInsertOAuthClients } = require('./bulk/oauth-clients.js');
const { bulkInsertUsers } = require('./bulk/users.js');
const { bulkInsertRoles } = require('./bulk/roles.js');
const { bulkInsertServices } = require('./bulk/services.js');
const { bulkInsertRolesServices } = require('./bulk/roles-services.js');
const { bulkInsertPersons } = require('./bulk/persons.js');

require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const encryptionService = new EncryptionUtil();

    // Create tables

    await createTableOAuthClients(queryInterface, Sequelize);
    await createTableUsers(queryInterface, Sequelize);
    await createTableRoles(queryInterface, Sequelize);
    await createTablePersons(queryInterface, Sequelize);
    await createTableServices(queryInterface, Sequelize);
    await createTableRolesServices(queryInterface, Sequelize);
    await createTableCharacters(queryInterface, Sequelize);
    await createTableKinds(queryInterface, Sequelize);
    await createTableGenders(queryInterface, Sequelize);
    await createTableProducts(queryInterface, Sequelize);

    // Data initial migration

    await bulkInsertOAuthClients(queryInterface, encryptionService);
    await bulkInsertUsers(queryInterface, encryptionService);
    await bulkInsertRoles(queryInterface);
    await bulkInsertServices(queryInterface);
    await bulkInsertRolesServices(queryInterface);
    await bulkInsertPersons(queryInterface);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('characters', null, {});
    await queryInterface.bulkDelete('kinds', null, {});
    await queryInterface.bulkDelete('genders', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('persons', null, {});
    await queryInterface.bulkDelete('roles_services', null, {});
    await queryInterface.bulkDelete('services', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('oauth_clients', null, {});

    await queryInterface.dropTable('characters');
    await queryInterface.dropTable('kinds');
    await queryInterface.dropTable('genders');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('roles_services');
    await queryInterface.dropTable('persons');
    await queryInterface.dropTable('services');
    await queryInterface.dropTable('roles');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('oauth_clients');
  }
};
