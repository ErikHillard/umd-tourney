import { getPool } from "../../utils/apiUtils";


export default async function PoolPage({ params }) {
  const pool = await getPool(params.pool);

  return (
    <div>
      <h1>Pool Name {pool.poolName} {typeof(pool)}</h1>
      <ul>
                {pool.teams.map((team) => (
                    <li>
                        <h2>{team}</h2>
                    </li>
                ))}
            </ul>
    </div>
  );
}


// This will display the individual pool