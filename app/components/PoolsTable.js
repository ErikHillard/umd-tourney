import Link from "next/link";
import { getAllPools } from "../utils/apiUtils";
import ClientPoolsTable from "./ClientPoolsTable";
import PoolTable from "./PoolTable";

export default async function PoolsTable({  }) {
  var pools = await getAllPools();
  if (!pools) {
    pools = []
  }
  return (
    <>
      {pools.map((pool) => (
        <>
          <h3 className="mt-10 text-3xl font-bold"><Link href={`/pools/${pool.id}`}>{pool.name}</Link></h3>
          <PoolTable pool={pool} />
        </>
        ))}
    </>
  );
}