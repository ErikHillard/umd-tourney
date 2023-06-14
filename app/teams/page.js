import { getAllTeams } from "../../utils/apiUtils";

// This will list all teams and their current standing

export default async function TeamPage({ params }) {
  const teams = await getAllTeams("bob");

  

  return (
    <div className={`grid grid-rows-${teams.length}`}>
      {teams.map((team) => (
          <div>{team.teamName}</div>
        ))}
    </div>
  );
}