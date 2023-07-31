import axios from "axios";

// In prod this will be increased as we will mainly be relying upon on demand revalidation
const REVALIDATION_TIME = 1;

export async function getAllTeams() {
  var teams;
  try {
    teams = await (await fetch(`${process.env.APIpath}/api/teams`, { 
      next: { 
        revalidate: REVALIDATION_TIME,
        tags: ['teams']
      } })).json();
  } catch (e) {
    teams = [];
  }
  
  // Leaving space here in case I want to do validation here instead of in the component itself

  return teams;
}

export async function getTeam(teamID) {
  var team;
  try {
    team = await (await fetch(`${process.env.APIpath}/api/teams/${teamID}`, { 
      next: { 
        revalidate: REVALIDATION_TIME,
        tags: [teamID]
      } })).json();
  } catch (e) {
    team = {};
  }
  

  // Leaving space here in case I want to do validation here instead of in the component itself

  return team;
}

export async function getAllPools() {
  var pools;
  try {
    pools = await (await fetch(`${process.env.APIpath}/api/pools`, { 
      next: { 
        revalidate: REVALIDATION_TIME,
        tags: ['pools']
      } })).json();
  } catch (e) {
    pools = [];
  }
  
  // Leaving space here in case I want to do validation here instead of in the component itself

  return pools;
}

export async function getPool(poolID) {
  var pool;
  try {
    pool = await (await fetch(`${process.env.APIpath}/api/pools/${poolID}`, { 
      next: { 
        revalidate: REVALIDATION_TIME,
        tags: [poolID]
      } })).json();
  } catch (e) {
    pool = {};
  }

  // Leaving space here in case I want to do validation here instead of in the component itself

  return pool;
}

export async function getMatch(matchID) {
  var match;
  try {
    match = await (await fetch(`${process.env.APIpath}/api/matches/${matchID}`, { 
      next: { 
        revalidate: REVALIDATION_TIME,
        tags: [matchID]
      } })).json();
  } catch (e) {
    match = {};
  }

  // Leaving space here in case I want to do validation here instead of in the component itself

  return match;
}

export async function getSet(setID) {
  // TODO test this

  var set;
  try {
    set = await (await fetch(`${process.env.APIpath}/api/sets/${setID}`, { 
      next: { 
        revalidate: REVALIDATION_TIME,
        tags: [setID]
      } })).json();
  } catch (e) {
    set = {};
  }

  // Leaving space here in case I want to do validation here instead of in the component itself

  return set;
}

export async function createPool(poolName) {
  if (!poolName) {
    return
  }

  const res = await fetch(`${process.env.APIpath}/api/pools`, {
    method: "POST",
    cache: 'no-store',
    body: JSON.stringify({name: poolName})
  });

  return res;
}

export async function createTeam(teamName, poolID) {
  if (!teamName || !poolID) {
    return
  }


  const res = await fetch(`${process.env.APIpath}/api/teams/${poolID}`, {
    method: "POST",
    cache: 'no-store',
    body: JSON.stringify({name: teamName})
  });

  return res;
}

export async function createMatch(poolID, team1, team2, team3) {
  if (!poolID || !team1 || !team2 || !team3) {
    return
  }

  const res = await fetch(`${process.env.APIpath}/api/matches/${poolID}/${team1.id}/${team2.id}/${team3.id}`, {
    method: "POST",
    cache: 'no-store'
  });

  return res;
}

export async function createSet(matchID) {
  if (!matchID) {
    return
  }

  const res = await fetch(`${process.env.APIpath}/api/sets/${matchID}`, {
    method: "POST",
    cache: 'no-store'
  });

  return res;
}


export async function resetTourney() {
  const res1 = await fetch(`${process.env.APIpath}/api/pools`, {
    method: "DELETE",
    cache: 'no-store'
  });
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