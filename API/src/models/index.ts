import { Sequelize } from "sequelize-typescript";
const dbConfig = require('../config/config.js');

import Collection from "./Collection";
import Card from "./Card";
import CollectionCard from "./CollectionCard";


const sequelize = new Sequelize(dbConfig.development);

Collection.initModel(sequelize);
Card.initModel(sequelize);
CollectionCard.initModel(sequelize);

// Associações
Collection.associate({ Card });
Card.associate({ Collection });
CollectionCard.associate({ Collection, Card });

export { sequelize, Collection, Card, CollectionCard };
