"use client"
import { useState } from "react";
import Link from "next/link";



export default async function DynamicPools( {initialPools} ) {

  const [pools, setPools] = useState(initialPools);
  
  return (
      <>
        {pools.map((pool) => (
            <div key={pool.poolName}>
              <li>
                <Link href={"/pools/" + pool.poolName} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{"Pool " + pool.poolName.charAt(pool.poolName.length - 1)}</Link>
              </li>
            </div>
        ))}
      </>
  );
}