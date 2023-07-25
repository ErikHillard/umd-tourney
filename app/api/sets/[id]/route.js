import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";


export async function GET(request, { params }) {
  const set = await prisma.set.findUnique({
    where: {
      id: params.id
    },
    include: {
      match: {
        include: {
          team1: true,
          team2: true
        }
      }
    }
  })

  if (!team) {
    return new NextResponse("Bad SetID", { status: 400 });
  }

  return NextResponse.json(set)
}

export async function POST(request, { params }) {
  const matchID = params.id;

  if (!matchID) {
    return new NextResponse("Bad Match ID", { status: 400 });
  }

  const set = await prisma.set.create({
    data: {
      match: {
        connect: {
          id: params.id
        }
      }
    }
  });

  // TODO surround in try catch in case it cannot connect to a match

  return NextResponse.json(set);
}