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

