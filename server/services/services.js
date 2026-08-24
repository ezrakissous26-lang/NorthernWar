import { map } from "../data/map.js";
import { createNewGame, getOneById, updateGameById } from "../repo/game-repo.js";
import { checkIfMapExist, createMap } from "../repo/map-repo.js";
import { findTerritoryById, winnerAndSurvivor } from "../utilis/utilis.js";

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

export async function attackPhase(gameId, body) {
    const result = await getOneById(gameId)
    if (result.status === 'finished') {
        const err = new Error('The game is finish')
        err.status = 400;
        throw err;
    }
    if (result.phase !== 'attack') {
        const err = new Error('The phase need be attck')
        err.status = 400;
        throw err;
    }
    if (body.skip === true) {
        result.phase = 'move'
        await updateGameById(gameId, result)
        return result
    }

    const from = findTerritoryById(result.territories, body.fromId)
    const to = findTerritoryById(result.territories, body.toId)
    const soldiers = Number(body.soldiers)

    if (!from || from.owner !== 'player') {
        const err = new Error('Invalid territory, its need be yours')
        err.status = 400;
        throw err;
    }
    if (!to || to.owner !== 'computer') {
        const err = new Error('Invalid territory for attack')
        err.status = 400;
        throw err;
    }
    if (!from.neighbors.includes(to.id)) {
        const err = new Error('Territories need be neighbor')
        err.status = 400;
        throw err;
    }
    if (!Number.isInteger(soldiers) || soldiers < 1) {
        const err = new Error('Soldiers need be number, and you need send minimun one soldier')
        err.status = 400;
        throw err;
    }
    if (from.soldiers - soldiers < 1) {
        const err = new Error('You need left minimum one soldier in your territory')
        err.status = 400;
        throw err;
    }
    const resultATtack = winnerAndSurvivor(soldiers, to.soldiers)
    from.soldiers -= soldiers
    if (resultATtack.attackerWins) {
        to.owner = 'player'
        to.soldiers = resultATtack.survivors
    } else {
        to.soldiers = resultATtack.survivors
    }
    if (resultATtack.attackerWins && to.headquarters) {
        result.status = 'finished'
        result.winner = 'player'
        await updateGameById(gameId, result)
        return result
    }
    result.phase = 'move'
    await updateGameById(gameId, result)
    return result
}