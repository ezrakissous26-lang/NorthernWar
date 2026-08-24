import { client } from "../db/connect.js";
import { ObjectId } from "mongodb";
import { getAllTerritories } from "./map-repo.js";

const dbNorthernWar = client.db("NorthernWar");
const collectionGame = dbNorthernWar.collection("game");

export async function createNewGame(playerName) {
  try {
    const result = await collectionGame.insertOne({
      playerName: playerName,
      round: 1,
      phase: "reinforce",
      status: "playing",
      winner: null,
      territories: await getAllTerritories(),
    });
    return result;
  } catch (error) {
    console.error("Error :", error.message);
    const err = new Error(error.message);
    err.status = 500;
    throw err;
  }
}

export async function getOneById(id) {
  try {
    const result = await collectionGame.findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error :", error.message);
    const err = new Error(error.message);
    err.status = 500;
    throw err;
  }
}

export async function updateSoldierByTerritoryId(gameId, territoryId, soldier) {
  try {
    const result = await collectionGame.findOneAndUpdate(
      { _id: new ObjectId(gameId), $and: [{ id: territoryId }] },
      { $set: { soldiers: soldier } },
    );
    console.log(result);
  } catch (error) {
    console.error("Error :", error.message);
    const err = new Error(error.message);
    err.status = 500;
    throw err;
  }
}
// await updateSoldierByTerritoryId('6a8bf2ab57bcf60fdfc5088f', 1, 50)

export async function updateGameById(id, gameData) {
  try {
    const goodData = { ...gameData };
    delete goodData._id;
    const result = await collectionGame.replaceOne({ _id: new ObjectId(id) }, goodData,);
    return result;
  } catch (error) {
    console.error("Error :", error.message);
    const err = new Error(error.message);
    err.status = 500;
    throw err;
  }
}