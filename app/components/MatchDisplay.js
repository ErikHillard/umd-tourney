'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function MatchDisplay({ match }) {
  const router = useRouter();
  // TODO disable on set 2 being finished
  return (
    <>
      <div className="flex justify-center mt-10 mb-3 w-full text-center items-center">
        <h3 className="text-2xl font-bold">{`Match ${match.index + 1}`}</h3>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 table-fixed">
          <thead className=" text-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-20 py-3 bg-gray-50 dark:bg-gray-800">
                Set #
              </th>
              <th scope="col" className="py-3">
                <Link href={`/teams/${match.team1.id}`}>{match.team1.name}</Link>
              </th>
              <th scope="col" className="py-3 bg-gray-50 dark:bg-gray-800">
                <Link href={`/teams/${match.team2.id}`}>{match.team2.name}</Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {match.sets.map((set, index) => (
              <tr className="border-b border-gray-200 dark:border-gray-700" key={set.id}>
                <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  Set {index + 1}
                </th>
                <td className="py-4">
                  {set.team1Score}
                </td>
                <td className="py-4 bg-gray-50 dark:bg-gray-800">
                  {set.team2Score}
                </td>
              </tr>
            ))}
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap">
                <p className="italic">{`Working:`}</p>
              </th>
              <td colSpan={2} className="py-4">
                <Link className="italic" href={`/teams/${match.workTeam.id}`}>{match.workTeam.name}</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Make this into a button that is disabled on match.finished? */}
      <div className="flex items-center justify-center my-3">
        <Button onClick={() => (router.push(`/matches/${match.id}`))} disabled={match.finished} fullWidth>
          Input Scores
        </Button>
      </div>


    </>
  );
}