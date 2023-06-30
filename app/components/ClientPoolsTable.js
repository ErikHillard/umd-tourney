'use client'

// import { usePools } from "../swrHooks/poolHooks"
import axios from 'axios'
// import useSWR from 'swr'

// const fetcher = url => axios.get(url).then(res => res.data)

export default async function ClientPoolsTable() {
  // const data = axios.get(`/api/pool`).then(res => res.data)
  // const { data, error, isLoading } = useSWR(`/api/pool`, fetcher, { refreshInterval: 10000 })
  // return (!isLoading) ? (
  //   <>
  //   {pools.map((pool) => (
    // <tr className="border-b dark:border-neutral-500" key={pool.name}>
    //   <td className="whitespace-nowrap px-6 py-4 font-medium"><Link href={`/pools/${pool.name}`}>{`Pool ${pool.name.charAt(4)}`}</Link></td>
    //   <td className="whitespace-nowrap px-6 py-4">{pool.format}</td>
    //   <td className="whitespace-nowrap px-6 py-4">{pool.gamesCompleted}</td>
    // </tr>
  //   ))}
  //   </>
  // ) :
  // (<span>Hello</span>)
  return (
    <></>
  )
}