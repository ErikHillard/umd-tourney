'use client'

import Link from "next/link";
import PoolTable from "../components/PoolTable";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import getAllPools from "../get/client/getAllPools";

export default function ClientPoolsPage({  }) {
  const { data: pools, isError, isInitialLoading, isLoading } = useQuery({
    queryKey: [`pools`],
    queryFn: async () => {
      const { data } = await getAllPools();
      console.log('fetched');
      return data;
    },
  })

  // TODO make this so that all isErrors will run the same things
  if (isError) {
    toast.error("We couldn't pull the pools right now sorry!")
    notFound()
  }

  return isInitialLoading ? <LoadingSpinner /> : (
    <div className="px-6 py-10 text-left text-neutral-800">
      <h1 className="mb-6 text-5xl font-bold">Pools</h1>
      {pools.map((pool) => (
        <div key={pool.id}>
          <h3 className="mt-10 text-3xl font-bold"><Link href={`/pools/${pool.id}`}>{pool.name}</Link></h3>
          <PoolTable pool={pool} />
        </div>
        ))}
    </div>
  );
}