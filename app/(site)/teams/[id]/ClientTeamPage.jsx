'use client'

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import MatchDisplay from "../../../components/MatchDisplay";
import getTeam from "../../../get/client/getTeam";
import { compareMatches } from "../../../utils/compare";
import LoadingSpinner from "../../../components/LoadingSpinner";

// This will list all teams and their current standing

export default function ClientTeamPage({ teamID }) {
  const { data: team, isError, isInitialLoading, isLoading } = useQuery({
    queryKey: [`${teamID}`],
    queryFn: async () => {
      const { data } = await getTeam(teamID);
      console.log('fetched')
      return data;
    },
  })

  const matches = useMemo(() => team?.matches1?.concat(team?.matches2, team?.workMatches).sort(compareMatches), [team]);

  if (isError) {
    toast.error("We couldn't find your requested team sorry!")
    notFound()
  }

  return isInitialLoading ? <LoadingSpinner /> : (
    <div className="px-6 py-10 text-left text-neutral-800">
      <h1 className="mb-6 text-5xl font-bold">{team.name}</h1>
      {/* TODO record */}
      
      <h1 className="mb-6 text-3xl font-bold">Remaing Matches</h1>
      {matches ? matches.map((match) => (<MatchDisplay match={match} key={match.id}/>)) : <>Matches aint found</>}
    </div>
  )
}