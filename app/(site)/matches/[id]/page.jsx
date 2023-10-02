import ClientMatchPage from "./ClientMatchPage";

export default function MatchPage( { params }) {
  return (
    <ClientMatchPage matchID={params.id} />
  )
}