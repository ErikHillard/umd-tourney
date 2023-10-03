'use client'

import { notFound, useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getMatch from "../../../get/client/getMatch";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Button from "../../../components/Button";
import { toast } from "react-hot-toast";
import axios from "axios";

// TODO Have this page redirect before it switches to the next set might be able to do this with a NextResponse with redirect

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

  const router = useRouter();
  const [set, setSet] = useState(1);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(20);

  const getCurrentSetFromRemote = useCallback((match) => {
    if (!match) {
      return 0;
    }
    let curr = 0;
    while (curr < match.sets.length) {
      if (!match.sets[curr].finished) {
        return curr + 1;
      }
      curr++;
    }

    return curr;
  }, [match])

  const currentSet = useMemo(() => isLoading ? set : (Math.max(set, getCurrentSetFromRemote(match))), [match, set, getCurrentSetFromRemote(match), isLoading])
  const notReadyToUpload = useMemo(() => isLoading ? true : (
    !(team1Score >= 21 && (Math.abs(team1Score - team2Score) > 0)) && !(team2Score >= 21 && (Math.abs(team1Score - team2Score) > 0))
  ), [team1Score, team2Score, isLoading])

  useEffect(() => {
    if (!notReadyToUpload) {
      toast.success("Ready to Submit Scores!")
    }
  }, [notReadyToUpload])

  if (isError) {
    notFound()
  }

  const onSubmit = () => {
    axios.put(`/api/sets?id=${match.sets[currentSet - 1].id}`,
     { 
      matchID: matchID,
      team1Score: team1Score,
      team2Score: team2Score,
      team1: match.team1,
      team2: match.team2,
      finalSet: currentSet === match.sets.length,
      poolID: match.poolID,
      matchesCompleted: match.pool.matchesCompleted

    })
      .then(() => setSet(set + 1))
      .then(() => setTeam1Score(0))
      .then(() => setTeam2Score(20))
      .catch(() => toast.error('Could not update the set'))
      .finally(() => queryClient.invalidateQueries({ queryKey: [`${matchID}`] }));
  }

  const incrementNumber = (teamNumber) => {
    if (teamNumber === 1) {
      setTeam1Score(team1Score + 1);
    } else {
      setTeam2Score(team2Score + 1);
    }

  }

  const decrementNumber = (teamNumber) => {
    if (teamNumber === 1) {
      setTeam1Score(Math.max(team1Score - 1, 0));
    } else {
      setTeam2Score(Math.max(team2Score - 1, 0));
    }
  }

  useEffect(() => {
    if (!isLoading && currentSet > match.sets.length) {
      //TODO change this so that when we fetch the match it just immeditately returns not adding anything on the stack as well as a toast would be great
      router.replace(`/pools/${match.poolID}`)
    }
  }, [isLoading, currentSet, match, router])

  

  return (isLoading) ? <LoadingSpinner /> : (
    <div className="flex flex-grow flex-col justify-between items-center">
      <div className="m-6">
        <h1 className="text-5xl font-semibold">Set: {Math.min(currentSet, match.sets.length)}</h1>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col items-center flex-grow">
          <h1 className="my-8 text-3xl font-semibold">{match.team1.name}</h1>
          <button
            onClick={() => incrementNumber(1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-full"
          >
            +
          </button>
          <div className="my-4 text-3xl font-semibold">{team1Score}</div>
          <button
            onClick={() => decrementNumber(1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-full"
          >
            -
          </button>
        </div>
        <div className="flex flex-col items-center border-l-2 flex-grow">
          <h1 className="my-8 text-3xl font-semibold">{match.team2.name}</h1>
          <button
            onClick={() => incrementNumber(2)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-full"
          >
            +
          </button>
          <div className="my-4 text-3xl font-semibold">{team2Score}</div>
          <button
            onClick={() => decrementNumber(2)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-full"
          >
            -
          </button>
        </div>
      </div>
      <div className="m-6">
        <Button onClick={onSubmit} type="button" disabled={notReadyToUpload}>
          Submit Scores
        </Button>
      </div>
    </div>
  );
}