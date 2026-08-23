import { client } from "../db/connect.js";

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
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error :", error.message);
  }
}



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
