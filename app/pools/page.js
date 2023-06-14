import { getAllPools } from "../../utils/apiUtils";
import { revalidatePath } from "next/cache";

export default async function PoolPage({  }) {
  const pools = await getAllPools();

  return (
    <ol className="list-disc">
      {/* {pools.map((pool) => (
          <li>{pool.poolName}</li>
        ))} */}
        <li>hello</li>
    </ol>
  );
}


// This will display all pools, maybe a list and the current games they are running