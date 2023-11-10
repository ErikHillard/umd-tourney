'use client'

import { QueryClient } from "@tanstack/query-core";
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ClientLogout() {
  const queryClient = new QueryClient();
  const session = useSession();
  if (session?.status === 'authenticated') {
    queryClient.invalidateQueries([`user`]);
    signOut();
  }
  return (
    <LoadingSpinner />
  )
}