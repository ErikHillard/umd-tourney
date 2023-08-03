import Link from "next/link";
import { getAllPools } from "../actions/get";
import { compareTeamsForPools } from "../utils/compare";
import ClientPoolsTable from "./ClientPoolsTable";
import PoolTable from "./PoolTable";

export default async function PoolsTable({  }) {
  var pools = await getAllPools();
  if (!pools) {
    pools = []
  }
  pools.forEach(pool => {
    pool.teams = pool.teams.sort(compareTeamsForPools)
  });

  return (
    <>
      {pools.map((pool) => (
        <div key={pool.id}>
          <h3 className="mt-10 text-3xl font-bold"><Link href={`/pools/${pool.id}`}>{pool.name}</Link></h3>
          <PoolTable pool={pool} />
        </div>
        ))}
    </>
  );
}