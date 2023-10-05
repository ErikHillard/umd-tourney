'use client'

import { useMemo } from "react";
import MatchDisplay from "../../../components/MatchDisplay";
import PoolTable from "../../../components/PoolTable";
import getPool from "../../../get/client/getPool";
import { compareMatches } from "../../../utils/compare";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function ClientPoolPage({ poolID }) {
  const { data: pool, isError, isInitialLoading, isLoading } = useQuery({
    queryKey: [`${poolID}`],
    queryFn: async () => {
      const { data } = await getPool(poolID);
      console.log('fetched');
      return data;
    },
  })
  const matches = useMemo(() => pool?.matches?.sort(compareMatches), [pool])
  const remainingMatches = useMemo(() => matches?.slice(pool.matchesCompleted), [matches, pool?.matches])
  const finishedMatches = useMemo(() => matches?.slice(0, pool.matchesCompleted), [matches, pool?.matches])
  if (isError) {
    toast.error("We couldn't find your requested pool sorry!")
    notFound()
  }

  return isInitialLoading ? <LoadingSpinner /> : (
    <div className="px-6 py-10 text-left text-neutral-800">
      <h1 className="mb-6 text-5xl font-bold">{pool.name}</h1>
      <PoolTable pool={pool} />

      {/* TODO Putting matches here...... not quite sure how I want to display that maybe scheduled matches vs finished matches */}
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