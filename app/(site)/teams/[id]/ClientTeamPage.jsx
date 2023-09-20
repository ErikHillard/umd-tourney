'use client'

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getTeam } from "../../../actions/get";
import MatchDisplay from "../../../components/MatchDisplay";
import { compareMatches } from "../../../utils/compare";

// This will list all teams and their current standing

export default function ClientTeamPage({ teamID }) {
  const {} = useQuery({
    queryKey: [`${teamID}`],
    queryFn: async () => {
      const { data } = await axios.get(`/api/teams/?id=${teamID}`);
      const team = await data.json()
      console.log(data);
    }
  })

  if (data) {
    console.log(data)
  }


  return (
    <h1>hello</h1>
  )
}