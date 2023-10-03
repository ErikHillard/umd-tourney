

export function compareMatches(matchA, matchB) {
  return matchA.index - matchB.index;
}

export function compareTeamsForPools(teamA, teamB) {
  const diff = teamA.wins - teamB.wins;
  
  return (diff == 0) ? (teamA.pointDiff - teamB.pointDiff) : diff;
}

export function compareTeamsForOverallTeams(teamA, teamB) {
  const wins = teamB.wins - teamA.wins;
  if (wins !== 0) {
    return wins;
  }

  const losses = teamA.losses - teamB.losses;
  if (losses !== 0) {
    return losses;
  }

  const pointDiff = teamB.pointDiff - teamA.pointDiff;
  if (pointDiff !== 0) {
    return pointDiff;
  }

  return teamA.name.localeCompare(teamB.name);
}