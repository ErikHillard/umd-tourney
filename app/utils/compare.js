

export function compareMatches(matchA, matchB) {
  return matchA.index - matchB.index;
}

export function compareTeamsForPools(teamA, teamB) {
  const diff = teamA.wins - teamB.wins;

  return (diff == 0) ? (teamA.pointDiff - teamB.pointDiff) : diff;
}