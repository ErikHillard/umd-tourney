import { notFound } from "next/navigation";
import { getTeam } from "../../../actions/get";

// This will list all teams and their current standing

export default async function TeamPage({ params }) {
  const team = await getTeam(params.id);
  if (JSON.stringify(team) === "{}") {
    console.log("hello")
    notFound();
  }

  return (
    <div>
      <h1>Team Name {team.name} and {team.wins}</h1>
    </div>
  )
}


// This will display a team's current record, what they are doing in the future,