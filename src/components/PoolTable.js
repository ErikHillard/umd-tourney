'use client'

import Link from "next/link";

export default function PoolTable({ pool }) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Team Name</th>
                  <th scope="col" className="px-6 py-4">Wins</th>
                  <th scope="col" className="px-6 py-4">Losses</th>
                  <th scope="col" className="px-6 py-4">Point Differential</th>
                </tr>
              </thead>
              <tbody>
              {pool?.teams?.map((team) => (
                <tr className="border-b dark:border-neutral-500" key={team.id}>
                  <td className="whitespace-nowrap px-6 py-4 font-medium"><Link href={`/teams/${team.id}`}>{team.name}</Link></td>
                  <td className="whitespace-nowrap px-6 py-4">{team.wins}</td>
                  <td className="whitespace-nowrap px-6 py-4">{team.losses}</td>
                  <td className="whitespace-nowrap px-6 py-4">{team.pointDiff}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}