import { revalidatePath } from "next/cache";
import clientPromise from "../lib/mongodb";

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

export async function getTourn() {
  try {
    const client = await clientPromise;
    const db = client.db("MainDB");
    // console.log(pool);

    const team = await db
            .collection("info")
            .find({ type: "info" })
            .sort({ name: -1 })
            .toArray();
    // console.log(team);
    return JSON.parse(JSON.stringify(team))[0];

  } catch (e) {
    console.error(e);
  }
}

export async function resetTourney() {
  try {
    const client = await clientPromise;
    const db = client.db("MainDB");
    // console.log(pool);

    const teams = await db.collection("Teams");
    teams.deleteMany({});
    const pools = await db.collection("Pools");
    pools.deleteMany({});

    return JSON.parse(JSON.stringify(team))[0];

  } catch (e) {
    console.error(e);
  }
}

export async function addTeam(teamName, poolNumber) {
  try {
    const client = await clientPromise;
    const db = client.db("MainDB");
    // console.log(pool);

    const doc = {
      teamName: teamName,
      poolName: `pool${poolNumber}`,
      wins: "0",
      losses: "0",
      point_differential:"0"
    }

    const result = await db
            .collection("Teams")
            .insertOne(doc);
    // console.log(team);

    await revalidatePath(`/teams/${teamName}`)
    await revalidatePath("/teams")

    return result;
  } catch (e) {
    console.error(e);
  }
}