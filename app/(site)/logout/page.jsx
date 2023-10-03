'use client'

import { signOut } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"

export default function Logout() {
  signOut();
  const router = useRouter();
  router.replace('/');
}