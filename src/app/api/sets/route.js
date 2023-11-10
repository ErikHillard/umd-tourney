import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb";

export async function PUT(request, { params }) {
  try {
    if (request.headers.get("Content-Type") !== 'application/json') {
      return new NextResponse('Need Body', { status: 400 })
    }
    const id = request.nextUrl.searchParams.get("id");
    const { matchID, poolID, matchesCompleted, finalSet, team1Score, team2Score, team1, team2 } = await request.json();

    //TODO maybe make this so that user name is required?

    if (!id || isNaN(team1Score) || isNaN(team2Score) || !matchID || !team1 || !team2 || !poolID || isNaN(matchesCompleted)) {
      console.log('BAD_REQUEST');
      return new NextResponse('Bad Search Parameters', { status: 400 })
    }

    const match = await prisma.match.findUnique({
      where: {
        id: matchID
      }
    })

    if (match.finished) {
      return new NextResponse("Match Already Finished", { status: 400})
    }

    const set = await prisma.set.findUnique({
      where: {
        id: id
      }
    })

    if (set.finished) {
      return new NextResponse("Set Already Finished", { status: 400})
    }

    

    const pointDiff = team1Score - team2Score;

    const updateSet = await prisma.set.update({
      where: {
        id: id
      },
      data: {
        team1Score: team1Score,
        team2Score: team2Score,
        finished: true
      }
    })
    if (finalSet) {
      const updateMatch = await prisma.match.update({
        where: {
          id: matchID
        },
        data: {
          finished: true
        }
      })
      const updatePool = await prisma.pool.update({
        where: {
          id: poolID
        },
        data: {
          matchesCompleted: matchesCompleted + 1
        }
      })
    }
    if (pointDiff > 0) {
      const updateTeam1 = await prisma.team.update({
        where: {
          id: team1.id
        },
        data: {
          pointDiff: team1.pointDiff + pointDiff,
          wins: team1.wins + 1
        }
      })

      const updateTeam2 = await prisma.team.update({
        where: {
          id: team2.id
        },
        data: {
          pointDiff: team2.pointDiff - pointDiff,
          losses: team2.losses + 1
        }
      })
    } else {
      const updateTeam1 = await prisma.team.update({
        where: {
          id: team1.id
        },
        data: {
          pointDiff: team1.pointDiff + pointDiff,
          losses: team1.losses + 1
        }
      })

      const updateTeam2 = await prisma.team.update({
        where: {
          id: team2.id
        },
        data: {
          pointDiff: team2.pointDiff - pointDiff,
          wins: team2.wins + 1
        }
      })
    }
    return new NextResponse();
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse('Server Error PUT Set', { status: 500 })
  }
}