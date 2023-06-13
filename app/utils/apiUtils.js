import clientPromise from "../../lib/mongodb";

export async function getTeam(teamName) {
  try {
    const client = await clientPromise;
    const db = client.db("MainDB");
    // console.log(pool);

    const team = await db
            .collection("Teams")
            .find({ teamName: teamName })
            .sort({ teamName: -1 })
            .toArray();

    return JSON.parse(JSON.stringify(team))[0];

  } catch (e) {
    console.error(e);
  }
}

export async function getAllTeams() {
  try {
    const client = await clientPromise;
    const db = client.db("MainDB");
    // console.log(pool);

    const team = await db
            .collection("Teams")
            .find({ })
            .sort({ teamName: 1 })
            .toArray();

    return JSON.parse(JSON.stringify(team));

  } catch (e) {
    console.error(e);
  }
}

export async function getPool(pool) {
  try {
    const client = await clientPromise;
    const db = client.db("MainDB");

    const movies = await db
            .collection("Pools")
            .find({ poolName: pool })
            .sort({ poolName: -1 })
            .toArray();

    return JSON.parse(JSON.stringify(movies))[0];

  } catch (e) {
    // console.log("hello");
    console.error(e);
  }
}

export async function getAllPools() {
  try {
    const client = await clientPromise;
    const db = client.db("MainDB");

    const movies = await db
            .collection("Pools")
            .find({ })
            .sort({ poolName: 1 })
            .toArray();

    return JSON.parse(JSON.stringify(movies));

  } catch (e) {
    // console.log("hello");
    console.error(e);
  }
}
