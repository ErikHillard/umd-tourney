import { getAllTeams } from "../utils/apiUtils";
// This will list all teams and their current standing

export default async function TeamPage({ params }) {
  const teams = await getAllTeams("bob");

  

  return (
    <div>
      <ul>
        {teams.map((team) => (
            <li>
                <h2>{team.teamName}</h2>
            </li>
        ))}
      </ul>
    </div>
  );
}