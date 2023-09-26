'use client'

import { useMemo } from "react";
import MatchDisplay from "../../../components/MatchDisplay";
import PoolTable from "../../../components/PoolTable";
import getPool from "../../../get/client/getPool";
import { compareMatches } from "../../../utils/compare";
import { useQuery } from "@tanstack/react-query";

export default function ClientPoolPage({ poolID }) {
  const { data: pool, isError, isInitialLoading, isLoading } = useQuery({
    queryKey: [`${poolID}`],
    queryFn: async () => {
      const { data } = await getPool(poolID);
      console.log('fetched');
      return data;
    },
    staleTime: 5*1000,
    refetchInterval: 15*1000,
  })
  const matches = useMemo(() => pool?.matches?.sort(compareMatches), [pool])
  const remainingMatches = useMemo(() => matches?.slice(pool.matchesCompleted), [matches])
  const finishedMatches = useMemo(() => matches?.slice(0, pool.matchesCompleted), [matches])
  if (isError) {
    return (<>Something went wrong</>)
  }

  return isInitialLoading ? (<>...loading</>) : (
    <div className="px-6 py-10 text-left text-neutral-800">
      <h1 className="mb-6 text-5xl font-bold">{pool.name}</h1>
      <PoolTable pool={pool} />

      {/* Putting matches here...... not quite sure how I want to display that maybe scheduled matches vs finished matches */}
      <h1 className="mt-8 text-5xl font-bold">Remaining Matches</h1>
      {remainingMatches?.map((match) => (
        <MatchDisplay match={match} key={match.id}/>
      ))}
      <h1 className="mt-8 text-5xl font-bold">Completed Matches</h1>
      {finishedMatches?.map((match) => (
        <MatchDisplay match={match} key={match.id}/>
      ))}
    </div>
  )

}