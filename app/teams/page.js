import Link from "next/link";
import { getAllTeams } from "../../utils/apiUtils";

// This will list all teams and their current standing
function compareTeams(teamA, teamB) {
  if (teamA.wins > teamB.wins) {
    return -1;
  } else if (teamA.wins < teamB.wins) {
    return 1;
  } else {
    const teamAPD = Number(teamA.point_differential)
    const teamBPD = Number(teamB.point_differential)
    if (teamAPD > teamBPD) {
      return -1;
    } else if (teamAPD < teamBPD) {
      return 1;
    }
  }

  return 0;
}


export default async function TeamPage({ params }) {
  const teams = (await getAllTeams("bob")).sort(compareTeams);

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
              {teams.map((team) => (
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-6 py-4 font-medium"><Link href={`/teams/${team.teamName}`}>{team.teamName}</Link></td>
                  <td className="whitespace-nowrap px-6 py-4">{team.wins}</td>
                  <td className="whitespace-nowrap px-6 py-4">{team.losses}</td>
                  <td className="whitespace-nowrap px-6 py-4">{team.point_differential}</td>
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