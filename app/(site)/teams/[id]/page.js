import { getTeam } from "../../../actions/get";
import MatchDisplay from "../../../components/MatchDisplay";
import { compareMatches } from "../../../utils/compare";
import ClientTeamPage from "./ClientTeamPage";

// This will list all teams and their current standing

export default async function TeamPage({ params }) {
  const team = await getTeam(params.id);
  if (JSON.stringify(team) === "{}") {
    // notFound();
    return (<>No team found</>)
  }
  const matches = team.matches1.concat(team.matches2, team.workMatches).sort(compareMatches);

  return (
    <div className="px-6 py-10 text-left text-neutral-800">
      <h1 className="mb-6 text-5xl font-bold">{team.name}</h1>
      {/* TODO record */}
      {matches.map((match) => (
        <MatchDisplay match={match} />
      ))}
      <ClientTeamPage teamID={params.id} />
    </div>
  )
}


// This will display a team's current record, what they are doing in the future,