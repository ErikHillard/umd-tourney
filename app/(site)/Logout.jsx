'use client'

import { signOut, useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react";

export default function Logout ( { } ) {

  const [variant, setVariant] = useState('IN');
  const session = useSession();
  return (
    (session?.status === 'authenticated' && <button onClick={() => {
      signOut()
      }}>
      Logout
    </button>)
  )
}