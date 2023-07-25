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
  return (
    <div className="bg-neutral-50 px-6 py-10 text-left text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
      <h1 className="mb-6 text-5xl font-bold">Pools</h1>
      <PoolsTable />
    </div>
  );
}


// This will display all pools, maybe a list and the current games they are running