import ClientPoolsTable from "./ClientPoolsTable";

export default async function PoolsTable({  }) {
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
                <ClientPoolsTable />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}