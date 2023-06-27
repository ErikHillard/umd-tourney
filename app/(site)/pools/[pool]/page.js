// import { getPool } from "../../../utils/apiUtils";



export default async function PoolPage({ params }) {
  // const pool = await getPool(params.pool);

  return (!null) ? 
  (<div>
    <h1>Pool Not Found</h1>
  </div>) :
  (
    <div>
      <h1>Pool Name {pool.poolName}</h1>
      <ul>
                {pool.teams.map((team) => (
                    <div key={team.teamName}>
                      <li>
                          <h2>{team}</h2>
                      </li>
                    </div>
                ))}
            </ul>
    </div>
  );

}


// This will display the individual pool