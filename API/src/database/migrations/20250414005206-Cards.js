"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cards", {
      cardID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      ownerID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      public: {
        type: Sequelize.BOOLEAN,
        defaultValue:true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(40),
        allowNull: false,
        validate: {
          len: {
            args: [3, 40],
            msg: "title's length must be between 3 and 40",
          },
        },
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alternatives: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      answer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          maxKeys(value) {
            if (Object.keys(value).length > 5) {
              throw new Error("Alternatives must have at most 5 keys");
            }
          },
          minKeys(value) {
            if (Object.keys(value).length < 2) {
              throw new Error("Alternatives must have at least 2 keys");
            }
          }
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cards");
  },
};
