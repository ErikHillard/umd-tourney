import ClientPoolPage from "./ClientPoolPage";

export default async function PoolPage({ params }) {
  return (
    <ClientPoolPage poolID={params.id} />
  )

}


// This will display the individual pool