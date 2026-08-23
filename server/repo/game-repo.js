import { client } from "../db/connect.js";
import { ObjectId } from "mongodb"

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
      territories: [],
    });
    return result;
  } catch (error) {
    console.error("Error :", error.message);
    return error
  }
}

export async function getOneById(id) {
    try {
        const result = await collectionGame.findOne({ _id: new ObjectId(id) })
        console.log(result)
        return result
    } catch (error) {
        console.error("Error :", error.message);
        return error
    }
}

await getOneById('6a8af3bcb5d63f2d0d9f2a87')


// async function initGame() {
//     try {
//         const result = await
//         return result
//     } catch (error) {
//         console.error('Error :', error.message)
//     }
// }

// async function createRound() {
//     try {
//         const result = await
//         return result
//     } catch (error) {
//         console.error('Error :', error.message)
//     }
// }

// async function createPLayer() {
//     try {
//         const result = await
//         return result
//     } catch (error) {
//         console.error('Error :', error.message)
//     }
// }

// async function init() {
//     try {
//         const result = await
//         return result
//     } catch (error) {
//         console.error('Error :', error.message)
//     }
// }

// async function getPlayerById() {
//     try {
//         const result = await
//         return result
//     } catch (error) {
//         console.error('Error :', error.message)
//     }
// }

// async function getGameById() {
//     try {
//         const result = await
//         return result
//     } catch (error) {
//         console.error('Error :', error.message)
//     }
// }

// async function updateMap() {
//     try {
//         const result = await
//         return result
//     } catch (error) {
//         console.error('Error :', error.message)
//     }
// }

// async function updateSoldierNumber() {
//     try {
//         const result = await
//         return result
//     } catch (error) {
//         console.error('Error :', error.message)
//     }
// }
