import { NextResponse } from "next/server"
import prisma from "../../libs/prismadb";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
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

  const team = await prisma.team.findUnique({
    where: {
      id: id
    },
    include: {
      pool: true,
      matches1: true,
      matches2: true,
      workMatches: true,
    }
  })

  if (!team) {
    return new NextResponse("Need Team ID", { status: 400 })
  }

  return NextResponse.json(team)
}

export async function POST(request, { params }) {

  const { poolID, name } = request.json();

  if (!name) {
    return new NextResponse("Need Team Name", { status: 400 })
  }
  if (!poolID) {
    return new NextResponse("Need Pool ID", { status: 400 })
  }

  const pool = (await prisma.pool.findUnique({
    where: {
      id: poolID
    },
    include: {
      teams: true,
    }
  }));

  const index = (pool) ? pool.teams.length : 0;

  const team = await prisma.team.create({
    data: {
      name: name,
      index: index,
      pool: {
        connect: {
          id: poolID
        }
      }
    }
  })

  return NextResponse.json(team)
}

export async function DELETE(request) {

  const teams = await prisma.team.deleteMany({})

  return NextResponse.json(teams)

}

// TODO Create post with body accepting team name