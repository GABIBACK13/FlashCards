import { Collection } from "../models";

async function storeCollection():Promise<void> {
  try {
    const newCollection = await Collection.create({
      name:"Private Collections",
      private: true,
      allowed: {
        "junin do morro": 2,
        "mauricio": 3
      }
    });

    console.log("collection created successfull:", newCollection.toJSON());
  } catch (error) {
    console.error("create collection error:", error);
  }
}

async function indexCollections() {
  try {
    const collections = await Collection.findAll();
    console.log("collections:", collections.map((collection:Collection) => collection.toJSON()));
  } catch (error) {
    console.error("Erro ao listar collections:", error);
  }
}

// ===================================CALL==//
storeCollection();