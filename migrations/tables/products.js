module.exports.createTableProducts = async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('products', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
        },
        image: {
            type: Sequelize.STRING(255),
            allowNull: true,
            unique: true,
        },
        created_date: {
            type: Sequelize.DATE,
            allowNull: true,
            unique: false,
        },
        qualification: {
            type: Sequelize.ENUM('1', '2', '3', '4', '5'),
            allowNull: true,
            unique: false,
        },
        gender_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'genders',
                key: 'id',
            },
        },
        kind_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'kinds',
                key: 'id',
            },
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
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },
        deleted_at: {
            type: Sequelize.DATE,
            allowNull: true,
        }
    });
}