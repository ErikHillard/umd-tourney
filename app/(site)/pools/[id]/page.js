// import { getPool } from "../../../utils/apiUtils";

import { getPool } from "../../../utils/apiUtils";



export default async function PoolPage({ params }) {
  const pool = await getPool(params.id);

  return (!pool) ? 
  (<div>
    <h1>Pool Not Found</h1>
  </div>) :
  (
    <div>
      <h1>Pool Name {pool.name}</h1>
      <ul>
                {pool.teams.map((team) => (
                    <div key={team.name}>
                      <li>
                          <h2>{team.name}</h2>
                      </li>
                    </div>
                ))}
            </ul>
    </div>
  );

}


// This will display the individual pool