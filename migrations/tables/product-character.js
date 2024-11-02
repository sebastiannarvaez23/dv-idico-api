module.exports.createTableProductsCharacters = async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('products_characters', {
        product_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id',
            },
        },
        character_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'characters',
                key: 'id',
            },
        }
    });
}