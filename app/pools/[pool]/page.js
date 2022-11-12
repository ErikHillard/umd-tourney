import { notFound } from "next/navigation";
import clientPromise from "../../../lib/mongodb";

async function getTeams(pool) {
  try {
    const client = await clientPromise;
    const db = client.db("MainDB");
    // console.log(pool);

    const movies = await db
            .collection(pool)
            .find({ name: {$exists: true} })
            .sort({ name: -1 })
            .toArray();
    // console.log(movies);
    return JSON.parse(JSON.stringify(movies));

  } catch (e) {
    console.error(e);
  }
}

export default async function PoolPage({ params }) {
  const pool = await getTeams(params.pool);
  // const connected = true;
  // if (!connected) {
  //   notFound();
  // }

  return (
    <div>
      <h1>Pool Name {params.pool} {typeof(pool)}</h1>
      <ul>
                {pool.map((team) => (
                    <li>
                        <h2>{team.name}</h2>
                    </li>
                ))}
            </ul>
    </div>
  );
}