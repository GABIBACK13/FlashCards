"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserCollections", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      collectionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Collections",
          key: "collectionID",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
    });

    await queryInterface.addConstraint("UserCollections", {
      fields: ["userID", "collectionID"],
      type: "unique",
      name: "unique_user_collection",
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserCollections");
  }
};
  