import { map } from "../data/map.js";
import { createNewGame, getOneById } from "../repo/game-repo.js";
import { checkIfMapExist, createMap } from "../repo/map-repo.js";

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
    if (result.winner !== null) {
    const err = new Error('The game is finish')
    err.status = 409;
    throw err;
    } else if (result.phase !== 'reinforce') {
        const err = new Error('The game is finish')
        err.status = 409;
        throw err;
    } for (const element of result.territories) {
        if (element.id == territoryId) {
            const currentnumberSoldier = element.soldiers
            //await appel de la function repo qui update a l'interieur de l'object et qui ajoute soldiers a curent + 3
            console.log('currentnumberSoldier', currentnumberSoldier)
            console.log('element id', element.id)
        }
    }
}