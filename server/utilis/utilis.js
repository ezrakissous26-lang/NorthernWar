export async function counterRound() {}

export function findTerritoryById(territories, id) {
    const ter = territories.find((t) => t.id === id)
    return ter
}

export function winnerAndSurvivor(sentSoldiers, defendingSoldiers) {
  const attackLuck = 0.6 + Math.random() * 0.4;
  const defenseLuck = 0.6 + Math.random() * 0.4;
  const attackPower = sentSoldiers * attackLuck;
  const defensePower = defendingSoldiers * defenseLuck;

  if (attackPower > defensePower) {
    const survivors = Math.max(
      1,
      Math.ceil((sentSoldiers * (attackPower - defensePower)) / attackPower)
    );
    return { attackerWins: true, survivors };
  } else {
    const survivors = Math.max(
      1,
      Math.ceil((defendingSoldiers * (defensePower - attackPower)) / defensePower)
    );
    return { attackerWins: false, survivors };
  }
}