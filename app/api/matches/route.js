import prisma from "../../libs/prismadb";


export async function GET(request, { params }) {
  const matches = await prisma.matches.findMany({
    include: {
      pool: true,
      teams: true,
      sets: true,
    }
  })
}