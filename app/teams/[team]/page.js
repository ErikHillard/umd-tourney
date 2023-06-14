import { redirect } from "next/dist/server/api-utils";
import { getTeam } from "../../../utils/apiUtils";


// This will list all teams and their current standing

export default async function TeamPage({ params }) {
  const team = await getTeam(params.team);
  
  return (!team) ? 
  (
    <div>
      <h1>Team Name and </h1>
    </div>
  ) :
  (
    <div>
      <h1>Team Name {team.teamName} and {team.wins}</h1>
    </div>
  );


  
}


// This will display a team's current record, what they are doing in the future,