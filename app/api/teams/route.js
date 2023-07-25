import { NextResponse } from "next/server"
import prisma from "../../libs/prismadb";

export async function GET(request) {
  const teams = await prisma.team.findMany({
    include: {
      pool: true,
      matches1: true,
      matches2: true,
      workMatches: true,
    }
  })

  // TODO: Handle this is not returning

  return NextResponse.json(teams)

}

export async function DELETE(request) {

  const teams = await prisma.team.deleteMany({})

  return NextResponse.json(teams)

}

// TODO Create post with body accepting team name