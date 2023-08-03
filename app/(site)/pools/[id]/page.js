import { getPool } from "../../../actions/get";
import MatchDisplay from "../../../components/MatchDisplay";
import PoolTable from "../../../components/PoolTable";
import { compareMatches } from "../../../utils/compare";

export default async function PoolPage({ params }) {
  const pool = await getPool(params.id);
  const matches = pool.matches.sort(compareMatches);
  const remainingMatches = matches.slice(pool.matchesCompleted)
  const finishedMatches = matches.slice(0, pool.matchesCompleted)

  return (
    <div className="bg-neutral-50 px-6 py-10 text-left text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
      <h1 className="mb-6 text-5xl font-bold">{pool.name}</h1>
      <PoolTable pool={pool} />

      {/* Putting matches here...... not quite sure how I want to display that maybe scheduled matches vs finished matches */}
      <h1 className="mt-8 text-5xl font-bold">Remaining Matches</h1>
      {remainingMatches.map((match) => (
        <MatchDisplay match={match} key={match.id}/>
      ))}
      <h1 className="mt-8 text-5xl font-bold">Completed Matches</h1>
      {finishedMatches.map((match) => (
        <MatchDisplay match={match} key={match.id}/>
      ))}
    </div>
  )

}


// This will display the individual pool