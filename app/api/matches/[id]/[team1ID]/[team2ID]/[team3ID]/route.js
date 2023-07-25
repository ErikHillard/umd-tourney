import { NextResponse } from "next/server";
import prisma from "../../../../../../libs/prismadb";


export async function POST(request, { params }) {
  const poolID = params.id;
  const team1ID = params.team1ID;
  const team2ID = params.team2ID;
  const team3ID = params.team3ID;

  if (!poolID || !team1ID || !team2ID) {
    return new NextResponse("Bad Pool ID", { status: 400 })
  } else if (!team1ID) {
    return new NextResponse("Bad Team1 ID", { status: 400 })
  } else if (!team2ID) {
    return new NextResponse("Bad Team2 ID", { status: 400 })
  } else if (!team3ID) {
    return new NextResponse("Bad Team3 ID", { status: 400 })
  }

  const pool = (await prisma.pool.findUnique({
    where: {
      id: poolID
    },
    include: {
      matches: true,
    }
  }));
  var index = 0;
  if (pool) {
    index = pool.matches.length;
  }
  

  const match = await prisma.match.create({
    data: {
      index: index,
      pool: {
        connect: {
          id: poolID
        }
      },
      team1: {
        connect: {
          id: team1ID
        }
      },
      team2: {
        connect: {
          id: team2ID
        }
      },
      workTeam: {
        connect: {
          id: team3ID
        }
      },
    }
  })

  return NextResponse.json(match)
}