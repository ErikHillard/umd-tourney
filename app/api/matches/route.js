import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";


export async function GET(request, { params }) {
  const matches = await prisma.match.findMany({
    include: {
      pool: true,
      teams: true,
      sets: true,
    }
  })

  return NextResponse.json(matches)
}