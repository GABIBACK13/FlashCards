import { Sequelize } from "sequelize";
import dbConfig from "../config/database";

// import MODELS from "./model_name";
// import Aluno from "./alunos";

const sequelize = new Sequelize(dbConfig.development);

// Aluno.initModel(sequelize);
// model_name.init(sequelize);
// model_name.init(sequelize);

/* [model_name, model_name].forEach((model) => {
  if ("associate" in model) {
    model.associate!(sequelize.models);
  }
}); */

export { sequelize /*, Aluno */ };
// export { sequelize, model_name, model_name};
