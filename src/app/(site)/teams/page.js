import Container from "@/components/ui/container";
import ClientTeamsPage from "./ClientTeamsPage";

export default async function TeamPage({ params }) {
  return (
    <Container className="px-6 pt-6">
      <ClientTeamsPage />
    </Container>
  );
}
