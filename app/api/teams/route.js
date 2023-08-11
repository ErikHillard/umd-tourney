import { NextResponse } from "next/server"
import prisma from "../../libs/prismadb";

export async function GET(request) {
  try {
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
        matches1: {
          include: {
            team1: true,
            team2: true,
            workTeam: true,
            sets: true
          }
        },
        matches2: {
          include: {
            team1: true,
            team2: true,
            workTeam: true,
            sets: true
          }
        },
        workMatches: {
          include: {
            team1: true,
            team2: true,
            workTeam: true,
            sets: true
          }
        },
      }
    })

    console.log(team, 'team')

    if (!team) {
      return new NextResponse("Need Team ID", { status: 400 })
    }

    return NextResponse.json(team)
  } catch (e) {
    console.log(e, 'SERVER_ERROR')
    return new NextResponse({ status: 500 })
  }
}

export async function POST(request) {

  let poolID = n = "";
  try {
    const body = await request.json()
    n = body.name;
    poolID = body.poolID;
  } catch (e) {
    return new NextResponse('Need Body', { status: 400 })
  }

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email || !currentUser?.role === 'admin') {
      return new NextResponse("Unauthorizied", { status: 401 })
    }
    if (!n) {
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
        name: n,
        index: index,
        pool: {
          connect: {
            id: poolID
          }
        }
      }
    })

    return NextResponse.json(team)
  } catch (e) {
    console.log(e, 'SERVER_ERROR')
    return new NextResponse({ status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email || !currentUser?.role === 'admin') {
      return new NextResponse("Unauthorizied", { status: 401 })
    }

    if (!id) {
      const teams = await prisma.team.deleteMany({})

      return NextResponse.json(teams)
    }

    const team = await prisma.team.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json(team)
  } catch (e) {
    console.log(e, 'SERVER_ERROR')
    return new NextResponse({ status: 500 })
  }

}

// TODO Create post with body accepting team name