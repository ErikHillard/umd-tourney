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
    team = [];
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
    pool = [];
  }

  // Leaving space here in case I want to do validation here instead of in the component itself

  return pool;
}

export async function createPool(poolName) {
  if (!poolName) {
    return
  }


  const res = await fetch(`${process.env.APIpath}/api/pools/${poolName}`, {
    method: "POST",
    cache: 'no-store'
  });

  return res;
}

export async function createTeam(teamName, poolID) {
  if (!teamName || !poolID) {
    return
  }


  const res = await fetch(`${process.env.APIpath}/api/teams/${teamName}?poolID=${poolID}`, {
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
  const res2 = await fetch(`${process.env.APIpath}/api/teams`, {
    method: "DELETE",
    cache: 'no-store'
  });
}