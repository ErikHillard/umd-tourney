"use client";

import { useMemo } from "react";
import MatchDisplay from "@/components/MatchDisplay";
import PoolTable from "@/components/PoolTable";
import getPool from "@/get/client/getPool";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner";
import { compareMatches } from "@/utils/compare";
import { Separator } from "@/components/ui/separator";

export default function ClientPoolPage({ poolID }) {
  const {
    data: pool,
    isError,
    isInitialLoading,
    isLoading,
  } = useQuery({
    queryKey: [`${poolID}`],
    queryFn: async () => {
      const { data } = await getPool(poolID);
      return data;
    },
  });
  const matches = useMemo(() => pool?.matches?.sort(compareMatches), [pool]);
  const remainingMatches = useMemo(
    () => matches?.slice(pool.matchesCompleted),
    [matches, pool?.matchesCompleted]
  );
  const finishedMatches = useMemo(
    () => matches?.slice(0, pool.matchesCompleted),
    [matches, pool?.matchesCompleted]
  );
  if (isError) {
    toast.error("We couldn't find your requested pool sorry!");
    notFound();
  }

  return isInitialLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="text-left text-neutral-800">
      <h1 className="mb-6 text-4xl font-bold">{pool.name}</h1>
      <PoolTable pool={pool} />
      
      {/* TODO Putting matches here...... not quite sure how I want to display that maybe scheduled matches vs finished matches */}

      {remainingMatches.length !== 0 && (
        <>
          <h1 className="mt-8 mb-6 text-3xl font-bold">Remaining Matches</h1>
          {remainingMatches?.map((match, index) => (
            <>
              {index !== 0 && <Separator decorative className="h-[5px] my-4" />}
              <MatchDisplay match={match} key={match.id} />
            </>
          ))}
        </>
      )}
      {finishedMatches.length !== 0 && (
        <>
          <h1 className="mt-6 text-3xl font-bold">Completed Matches</h1>
          {finishedMatches?.map((match, index) => (
            <>
              {index !== 0 && <Separator decorative className="h-[5px] my-4" />}
              <MatchDisplay match={match} key={match.id} />
            </>
          ))}
        </>
      )}
    </div>
  );
}
