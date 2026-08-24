export async function counterRound() {}

export function findTerritoryById(territories, id) {
    const ter = territories.find((t) => t.id === id)
    return ter
}