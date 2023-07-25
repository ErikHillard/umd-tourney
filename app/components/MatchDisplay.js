import Link from "next/link";

export default async function MatchDisplay({ match }) {
  return (
    <>
      <div className="flex justify-between items-end">
        <h3 className="mt-10 text-2xl font-bold"><Link href={`/matches/${match.id}`}>{`${match.team1.name} vs ${match.team2.name} with ${match.workTeam.name} working`}</Link></h3>
        <Link href="/">
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Input Scores
          </div>
        </Link>
      </div>
      {/* TODO Ref button here */}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">{"Set #"}</th>
                    <th scope="col" className="px-6 py-4">{match.team1.name}</th>
                    <th scope="col" className="px-6 py-4">{match.team1.name}</th>
                  </tr>
                </thead>
                <tbody>
                {match.sets.map((set, index) => (
                  <tr className="border-b dark:border-neutral-500" key={set.id}>
                    <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{set.team1Score}</td>
                    <td className="whitespace-nowrap px-6 py-4">{set.team1Score}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}