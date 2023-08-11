import { getCurrentUser } from "../../actions/get";
import PoolsTable from "../../components/PoolsTable";

export default async function PoolsPage({  }) {
  const user = await getCurrentUser();
  console.log(user, "user");
  return (
    <div className="bg-neutral-50 px-6 py-10 text-left text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
      <h1 className="mb-6 text-5xl font-bold">Pools</h1>
      <PoolsTable />
    </div>
  );
}


// This will display all pools, maybe a list and the current games they are running