'use client'

import { useRouter } from "next/navigation"
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getMatch from "../../../get/client/getMatch";

export default function ClientMatchPage({ matchID }) {
  const { data: match, isError, isInitialLoading } = useQuery({
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
  const [set, setVariant] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {

  }
  return (
    <></>
  )
}