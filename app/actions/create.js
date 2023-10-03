export async function createPool(poolName) {
  const pool = await prisma.pool.create({
    data: {
      name: poolName,
    }
  })

  return pool;
}

export async function createTeam(teamName, poolID) {
  const pool = (await prisma.pool.findUnique({
    where: {
      id: poolID
    },
    include: {
      teams: true,
    }
  }));

  const index = (pool) ? pool.teams.length : 0;
  const team = await prisma.team.create({
    data: {
      name: teamName,
      index: index,
      pool: {
        connect: {
          id: poolID
        }
      }
    }
  })

  return team;
}

export async function createMatch(poolID, team1, team2, team3) {
  const pool = (await prisma.pool.findUnique({
    where: {
      id: poolID
    },
    include: {
      matches: true,
    }
  }));
  var index = 0;
  if (pool) {
    index = pool.matches.length;
  }


  const match = await prisma.match.create({
    data: {
      index: index,
      pool: {
        connect: {
          id: poolID
        }
      },
      team1: {
        connect: {
          id: team1
        }
      },
      team2: {
        connect: {
          id: team2
        }
      },
      workTeam: {
        connect: {
          id: team3
        }
      },
    }
  })

  return match;
}

export async function createSet(matchID) {

  const set = await prisma.set.create({
    data: {
      match: {
        connect: {
          id: matchID
        }
      }
    }
  });

  return set;
}

export async function generateMatchesForPool(poolID) {
  const pool = await (await fetch(`${process.env.APIpath}/api/pools?id=${poolID}`)).json();
  const teams = pool.teams;

  const sets = pool.sets;


  // TODO detect amount of teams and assign accordingly

  // 1 v 3 w 2
  const m1 = (await createMatch(poolID, teams[0].id, teams[2].id, teams[1].id));
  for (let i = 0; i < sets; i++) {
    await createSet(m1.id);
  }

  // 2 v 4 w 1
  const m2 = (await createMatch(poolID, teams[1].id, teams[3].id, teams[0].id)).id;
  for (let i = 0; i < sets; i++) {
    await createSet(m2);
  }

  // 1 v 4 w 3
  const m3 = (await createMatch(poolID, teams[0].id, teams[3].id, teams[2].id)).id;
  for (let i = 0; i < sets; i++) {
    await createSet(m3);
  }

  // 2 v 3 w 1
  const m4 = (await createMatch(poolID, teams[1].id, teams[2].id, teams[0].id)).id;
  for (let i = 0; i < sets; i++) {
    await createSet(m4);
  }

  // 3 v 4 w 2
  const m5 = (await createMatch(poolID, teams[2].id, teams[3].id, teams[1].id)).id;
  for (let i = 0; i < sets; i++) {
    await createSet(m5);
  }

  // 1 v 2 w 4
  const m6 = (await createMatch(poolID, teams[0].id, teams[1].id, teams[3].id)).id;
  for (let i = 0; i < sets; i++) {
    await createSet(m6);
  }
}


export async function resetTourney() {
  const res1 = await fetch(`${process.env.APIpath}/api/pools`, {
    method: "DELETE",
    cache: 'no-store'
  });
}