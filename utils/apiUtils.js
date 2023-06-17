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

    const pools = await db
            .collection("Pools")
            .find({ poolName: pool })
            .sort({ poolName: -1 })
            .toArray();

    return JSON.parse(JSON.stringify(pools))[0];

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
    
    const teamNumber = (await getPool(doc.poolName)).teamTotal + 1;

    const result2 = await db
            .collection("Pools")
            .updateOne(
              { poolName: doc.poolName },
              { $push: { teams: doc.teamName },
                $inc: { teamTotal: 1 },
                $set: { format: `${teamNumber} to 21` }}
            )
    

    await revalidatePath(`/teams/${teamName}`)
    await revalidatePath("/teams")

    await revalidatePath(`/pools/${doc.poolName}`)
    await revalidatePath("/pools")

    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function addPool(poolNumber) {
  try {
    const client = await clientPromise;
    const db = client.db("MainDB");
    // console.log(pool);

    const doc = {
      poolName: `pool${poolNumber}`,
      teamTotal: 0,
      teams: [],
      gamesCompleted: 0,
      format: "0 to 21"
    }

    const result = await db
            .collection("Pools")
            .insertOne(doc);
    

    await revalidatePath(`/pools/${doc.poolName}`)
    await revalidatePath("/pools")
  } catch (e) {
    console.error(e);
  }
}

export async function setupTestTourney(poolNumber) {
  try {
    await resetTourney()

    // Create Pool 1
    await addPool(1)
    await addTeam("bob", 1)
    await addTeam("jim", 1)
    await addTeam("hul", 1)

    // Create Pool 2
    await addPool(2)
    await addTeam("what", 2)
    await addTeam("the", 2)
    await addTeam("heck", 2)

    // Create Pool 3
    await addPool(3)
    await addTeam("Big_Boys", 3)
    await addTeam("WhatchuDoing", 3)
    await addTeam("whyyyyyyyyyy", 3)
    
  } catch (e) {
    console.error(e);
  }
}