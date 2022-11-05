function checkNewWin(newWins, oldWins) {
  const newWinKeys = [];
  const newLossKeys = [];

  for (let key of Object.keys(newWins)) {
    if (oldWins[key] === undefined) {
      if (newWins[key]) newWinKeys.push(key);
      else newLossKeys.push(key);
    }
  }

  if (newWinKeys.length)
    return { id: newWinKeys[0], won: newWins[newWinKeys[0]] };
  else if (newLossKeys.length)
    return { id: newLossKeys[0], won: newLossKeys[newWinKeys[0]] };
  else return undefined;
}

export { checkNewWin };
