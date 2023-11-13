import Container from "@/components/ui/container";
import ClientPoolPage from "./ClientPoolPage";

export default async function PoolPage({ params }) {
  return (
    <Container className="px-6 pt-6">
      <ClientPoolPage poolID={params.id} />
    </Container>
  );
}

// This will display the individual pool
