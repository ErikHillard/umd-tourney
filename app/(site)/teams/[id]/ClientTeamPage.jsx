'use client'

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import MatchDisplay from "../../../components/MatchDisplay";
import { compareMatches } from "../../../utils/compare";

// This will list all teams and their current standing

export default function ClientTeamPage({ teamID }) {
  const { data:team, isError, isInitialLoading, isLoading } = useQuery({
    queryKey: [`${teamID}`],
    queryFn: async () => {
      const { data } = await axios.get(`/api/teams/?id=${teamID}`);
      console.log('fetched')
      return data;
    },
    staleTime: 5*1000,
    refetchInterval: 15*1000,
    keepPreviousData: true
  })

  const matches = useMemo(() => team?.matches1?.concat(team?.matches2, team?.workMatches).sort(compareMatches), [team]);

  if (isError) {
    return (<>Something went wrong</>)
  }

  return isInitialLoading ? (<>...loading</>) : (
    <div className="px-6 py-10 text-left text-neutral-800">
      <h1 className="mb-6 text-5xl font-bold">{team.name}</h1>
      {/* TODO record */}
      
      <h1 className="mb-6 text-3xl font-bold">Remaing Matches</h1>
      {matches ? matches.map((match) => (<MatchDisplay match={match} key={match.id}/>)) : <>Matches aint found</>}
    </div>
  )
}