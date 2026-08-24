import { map } from "../data/map.js";
import { createNewGame, getOneById, updateGameById } from "../repo/game-repo.js";
import { checkIfMapExist, createMap } from "../repo/map-repo.js";
import { findTerritoryById } from "../utilis/utilis.js";

export async function initMapForCreateGame() {
    const isExist = await checkIfMapExist()
    if (!isExist) {
        await createMap(map)
    }
}

export async function checkIfEndGame(id) {
    const result = await getOneById(id)
    return result.winner === null
}

export async function reinforcePhase(gameId, territoryId) {
    const result = await getOneById(gameId)
    if (result.winner === 'finished') {
    const err = new Error('The game is finish')
    err.status = 409;
    throw err;
    }
    if (result.phase !== "reinforce") {
        const err = new Error('The phase need be reinforce')
        err.status = 409;
        throw err;
    }
    const ter = findTerritoryById(result.territories, territoryId)
    if (ter.owner !== 'player') {
        const err = new Error('Territory need be yours')
        err.status = 400
        throw err
    }
    ter.soldiers += 3
    result.phase = 'attack'
    await updateGameById(gameId, result) 
    return result
}