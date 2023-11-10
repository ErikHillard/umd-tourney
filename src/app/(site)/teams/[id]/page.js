import ClientTeamPage from "./ClientTeamPage";

// This will list all teams and their current standing

export default async function TeamPage({ params }) {
  return (
    <ClientTeamPage teamID={params.id} />
  )
}


// This will display a team's current record, what they are doing in the future,