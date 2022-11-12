import clientPromise from "../../../../lib/mongodb";
import CreateLoading from "./temp";

async function getTeam(teamName, poolName) {
  try {
    const client = await clientPromise;
    const db = client.db("MainDB");
    // console.log(pool);

    const team = await db
            .collection(poolName)
            .find({ name: teamName})
            .sort({ name: -1 })
            .toArray();
    // console.log(team);
    return JSON.parse(JSON.stringify(team))[0];

  } catch (e) {
    console.error(e);
  }
}


export default async function TeamPage({ params }) {
  const team = await getTeam(params.team, params.pool);

  // console.log(team);

  return (
    <div>
      <h1>Team Name {params.team} and {team.wins}</h1>
      <CreateLoading />
    </div>
  );
}