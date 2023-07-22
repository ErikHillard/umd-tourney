import { NextResponse } from "next/server"
import prisma from "../../../libs/prismadb";

export async function GET(request, { params }) {

  const team = await prisma.team.findUnique({
    where: {
      id: params.id
    },
    include: {
      pool: true,
      matches: true,
    }
  })

  if (!team) {
    return new NextResponse("Need Team ID", { status: 400 })
  }

  return NextResponse.json(team)

}

export async function POST(request, { params }) {
  const name = params.id
  if (!name) {
    return new NextResponse("Need Team Name", { status: 400 })
  }
  const poolID = request.nextUrl.searchParams.get("poolID")
  if (!poolID) {
    return new NextResponse("Need Pool Name", { status: 400 })
  }

  const team = await prisma.team.create({
    data: {
      name: name,
      pool: {
        connect: {
          id: poolID
        }
      }
    }
  })

  // use 

  return NextResponse.json(team)
}

export async function DELETE(request, { params }) {
  const team = await prisma.team.findUnique({
    where: {
      id: params.id
    }
  });

  var matchIDs = []

  team.matchIDs.forEach(matchID => {
    matchIDs.push({id: matchID})
  });


  await prisma.team.update({
    where: {
      id: params.id
    },
    data: {
      matches: {
        disconnect: matchIDs
      }
    }
  })

  const t = await prisma.team.delete({
    where: {
      id: params.id
    }
  })

  return NextResponse.json(t)

}
