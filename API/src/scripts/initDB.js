const { sequelize } = require("../models");

// Força a criação das tabelas
sequelize
  .sync({ force: true }) // ⚠️ Isso APAGA as tabelas existentes e recria!
  .then(() => {
    console.log("Tabelas criadas com sucesso!");
    process.exit();
  })
  .catch((err) => {
    console.error("Erro ao criar tabelas:", err);
    process.exit(1);
  });
