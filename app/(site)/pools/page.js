// import { getAllPools } from "../../../utils/apiUtils";
import { revalidatePath } from "next/cache";
import Link from "next/link";

function comparePools(poolA, poolB) {
  if (Number(poolA.poolName.charAt(poolA.poolName.length)) > Number(poolB.poolName.charAt(poolB.poolName.length))) {
    return 1;
  } else if (Number(poolA.poolName.charAt(poolA.poolName.length)) < Number(poolB.poolName.charAt(poolB.poolName.length))) {
    return -1;
  }

  return 0;
}

export default async function PoolPage({  }) {
  // const pools = (await getAllPools()).sort(comparePools);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Pool</th>
                  <th scope="col" className="px-6 py-4">Teams</th>
                  <th scope="col" className="px-6 py-4">Game Format</th>
                  <th scope="col" className="px-6 py-4">Games Remaining</th>
                </tr>
              </thead>
              <tbody>
              {/* {pools.map((pool) => (
                <tr className="border-b dark:border-neutral-500" key={pool.poolName}>
                  <td className="whitespace-nowrap px-6 py-4 font-medium"><Link href={`/pools/${pool.poolName}`}>{`Pool ${pool.poolName.charAt(4)}`}</Link></td>
                  <td className="whitespace-nowrap px-6 py-4">{pool.teamTotal}</td>
                  <td className="whitespace-nowrap px-6 py-4">{pool.format}</td>
                  <td className="whitespace-nowrap px-6 py-4">{pool.gamesCompleted}</td>
                </tr>
              ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


// This will display all pools, maybe a list and the current games they are running