// import { getAllPools } from "../../../utils/apiUtils";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import PoolsTable from "../../components/PoolsTable";

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
    <PoolsTable />
  );
}


// This will display all pools, maybe a list and the current games they are running