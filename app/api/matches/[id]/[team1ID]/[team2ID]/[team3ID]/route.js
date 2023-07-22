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

  const match = await prisma.match.create({
    data: {
      pool: {
        connect: {
          id: poolID
        }
      },
      teams: {
        connect: [{id: team1ID}, {id: team2ID}, {id: team3ID}]
      }
    }
  })

  return NextResponse.json(match)
}