module.exports.createTableCharacters = async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('characters', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
        },
        image: {
            type: Sequelize.STRING(255),
            allowNull: true,
            unique: true,
        },
        age: {
            type: Sequelize.STRING(3),
            allowNull: false,
            unique: false,
        },
        history: {
            type: Sequelize.TEXT,
            allowNull: true,
            unique: false,
        },
        created_by: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        updated_by: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.fn('NOW'),
        },
        deleted_at: {
            type: Sequelize.DATE,
            allowNull: true,
        }
    });
}