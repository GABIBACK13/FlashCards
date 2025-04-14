import { Sequelize } from "sequelize-typescript";
const dbConfig = require('../config/config.js');

// import MODELS from "./model_name";
import Collection from "./Collection";

const sequelize = new Sequelize(dbConfig.development);

Collection.initModel(sequelize);
// model_name.init(sequelize);
// model_name.init(sequelize);

/* [Collection].forEach((model) => {
  if ("associate" in model) {
    model.associate!(sequelize.models);
  }
}); */

export { sequelize, Collection };
