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

