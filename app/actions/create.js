import { getPool } from "./get";

const REVALIDATION_TIME = process.env.REVALIDATION_TIME;

export async function createPool(poolName) {
  if (!poolName) {
    return
  }

  const res = await fetch(`${process.env.APIpath}/api/pools`, {
    method: "POST",
    cache: 'no-store',
    body: JSON.stringify({ name: poolName })
  });

  return res;
}

export async function createTeam(teamName, poolID) {
  if (!teamName || !poolID) {
    return
  }

  const res = await fetch(`${process.env.APIpath}/api/teams`, {
    method: "POST",
    cache: 'no-store',
    body: JSON.stringify({ name: teamName, poolID: poolID })
  });

  return res;
}

export async function createMatch(poolID, team1, team2, team3) {
  if (!poolID || !team1 || !team2 || !team3) {
    return
  }
  

  const res = await fetch(`${process.env.APIpath}/api/matches`, {
    method: "POST",
    cache: 'no-store',
    body: JSON.stringify({
      poolID: poolID,
      team1ID: team1.id,
      team2ID: team2.id,
      team3ID: team3.id
    })
  });

  return res;
}

export async function createSet(matchID) {
  if (!matchID) {
    return
  }

  const res = await fetch(`${process.env.APIpath}/api/sets`, {
    method: "POST",
    cache: 'no-store',
    body: JSON.stringify({
      matchID: matchID,
    })
  });

  return res;
}

export async function generateMatchesForPool(poolID) {
  const pool = await getPool(poolID);
  const teams = pool.teams;

  const sets = pool.sets;


  // TODO detect amount of teams and assign accordingly

  // 1 v 3 w 2
  const m1 = (await (await createMatch(poolID, teams[0], teams[2], teams[1])).json());
  for (let i = 0; i < sets; i++) {
    await createSet(m1.id);
  }

  // 2 v 4 w 1
  const m2 = (await (await createMatch(poolID, teams[1], teams[3], teams[0])).json()).id;
  for (let i = 0; i < sets; i++) {
    await createSet(m2);
  }

  // 1 v 4 w 3
  const m3 = (await (await createMatch(poolID, teams[0], teams[3], teams[2])).json()).id;
  for (let i = 0; i < sets; i++) {
    await createSet(m3);
  }

  // 2 v 3 w 1
  const m4 = (await (await createMatch(poolID, teams[1], teams[2], teams[0])).json()).id;
  for (let i = 0; i < sets; i++) {
    await createSet(m4);
  }

  // 3 v 4 w 2
  const m5 = (await (await createMatch(poolID, teams[2], teams[3], teams[1])).json()).id;
  for (let i = 0; i < sets; i++) {
    await createSet(m5);
  }

  // 1 v 2 w 4
  const m6 = (await (await createMatch(poolID, teams[0], teams[1], teams[3])).json()).id;
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