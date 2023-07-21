import axios from "axios";


export async function getAllTeams() {
  // var teams;
  // try {
  //   teams = await (await fetch(`${process.env.APIpath}/api/teams`, { 
  //     next: { 
  //       revalidate: 1,
  //       tags: ['teams']
  //     } })).json();
  // } catch (e) {
  //   teams = [];
  // }

  const teams = await (await fetch(`${process.env.APIpath}/api/teams`, { 
    next: { 
      revalidate: 1,
      tags: ['teams']
    } })).json();
  

  // Leaving space here in case I want to do validation here instead of in the component itself

  return teams;
}

export async function getTeam(teamID) {
  var team;
  try {
    team = await (await fetch(`${process.env.APIpath}/api/teams/${teamID}`, { 
      next: { 
        revalidate: 1,
        tags: [teamID]
      } })).json();
  } catch (e) {
    team = [];
  }
  

  // Leaving space here in case I want to do validation here instead of in the component itself

  return team;
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

  console.log(`${process.env.APIpath}/api/teams/${teamName}?poolID=${poolID}`)

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