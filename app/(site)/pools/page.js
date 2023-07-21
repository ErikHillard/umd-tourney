// import { getAllPools } from "../../../utils/apiUtils";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import PoolsTable from "../../components/PoolsTable";
import { getAllPools } from "../../utils/apiUtils";

function comparePools(poolA, poolB) {
  if (Number(poolA.name.charAt(poolA.name.length)) > Number(poolB.name.charAt(poolB.name.length))) {
    return 1;
  } else if (Number(poolA.name.charAt(poolA.name.length)) < Number(poolB.name.charAt(poolB.name.length))) {
    return -1;
  }

  return 0;
}

export default async function PoolPage({  }) {
  var pools = (await getAllPools()).sort(comparePools);

  if (!pools) {
    pools = []
  }

  return (
    <PoolsTable />
  );
}


// This will display all pools, maybe a list and the current games they are running