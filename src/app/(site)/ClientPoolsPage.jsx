"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import PoolTable from "@/components/PoolTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import getAllPools from "@/get/client/getAllPools";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

export default function ClientPoolsPage({}) {
  const {
    data: pools,
    isError,
    isInitialLoading,
    isLoading,
  } = useQuery({
    queryKey: [`pools`],
    queryFn: async () => {
      const { data } = await getAllPools();
      return data;
    },
  });

  // TODO make this so that all isErrors will run the same things
  if (isError) {
    toast.error("We couldn't pull the pools right now sorry!");
    notFound();
  }

  return isInitialLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="px-6 pt-6 text-left">
      <h1 className="mb-6 text-4xl font-bold">Pools</h1>
      {pools.map((pool, i) => (
        <div key={pool.id}>
          {i !== 0 && <Separator decorative className="h-[5px] my-3"/>}
          <Button asChild variant="ghost" className="p-6 transition-colors hover:text-primary">
            <Link href={`/pools/${pool.id}`}>
              <h3 className="text-2xl font-bold">{pool.name}</h3>
            </Link>
          </Button>
          <PoolTable pool={pool} />
        </div>
      ))}
    </div>
  );
}
