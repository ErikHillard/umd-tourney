import { NextResponse } from "next/server"
import prisma from "../../libs/prismadb";

export async function GET(request) {
  const pools = await prisma.pool.findMany({
    include: {
      teams: true,
      matches: {
        include: {
          team1: true,
          team2: true,
          workTeam: true,
          sets: true
        }
      },
    }
  })

  return NextResponse.json(pools)
}

export async function POST(request, { params }) {
  const { name } = await request.json()

  if (!name) {
    return new NextResponse("Need Pool Name", { status: 400 })
  }

  const pool = await prisma.pool.create({
    data: {
      name: name,
    }
  }) 

  return NextResponse.json(pool)
}

export async function DELETE(request) {

  const pools = await prisma.pool.deleteMany({})

  return NextResponse.json(pools)

}

// TODO Create post that just creates a pool with no team name

