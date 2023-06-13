import { getAllPools } from "../utils/apiUtils";


export default async function PoolPage({  }) {
  const pools = await getAllPools();

  return (
    <div>
      <ul>
        {pools.map((pool) => (
            <li>
                <h2>{pool.poolName}</h2>
            </li>
        ))}
      </ul>
    </div>
  );
}


// This will display all pools, maybe a list and the current games they are running