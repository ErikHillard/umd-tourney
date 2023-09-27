'use client'

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getMatch from "../../../get/client/getMatch";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function ClientMatchPage({ matchID }) {
  const queryClient = useQueryClient();
  const { data: match, isError, isInitialLoading, isLoading } = useQuery({
    queryKey: [`${matchID}`],
    queryFn: async () => {
      const { data } = await getMatch(matchID);
      console.log('fetched')
      return data;
    },
  })

  if(match) {
    console.log(match)
  }

  const router = useRouter();
  const [set, setSet] = useState(1);

  function getCurrentSetFromRemote(match) {
    let curr = 0;
    console.log(match)
    while (curr < match.sets.length) {
      if (!match.sets[curr].finished) {
        return curr + 1;
      }
      curr++;
    }

    return curr;
  }

  const currentSet = useMemo(() => isLoading ? set : (Math.max(set, getCurrentSetFromRemote(match))), [match, set])

  const onSubmit = (data) => {
    queryClient.invalidateQueries({ queryKey: [`${matchID}`]})
  }
  return isLoading ? <LoadingSpinner /> : (
    <div className="bg-slate-500">
      <h1>{`Set ${set}`}</h1>
    </div>
  )
}