import { NextResponse } from "next/server"
import prisma from "../../libs/prismadb"



export async function GET(request, { params }) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      const sets = await prisma.set.findMany({
        include: {
          match: {
            include: {
              pool: true,
              team1: true,
              team2: true
            }
          }
        }
      })
      return NextResponse.json(sets)
    } else {
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
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse('Server Error GET Set', { status: 500 })
  }
}

export async function POST(request) {
  let matchID = ""
  try {
    const body = await request.json()
    matchID = body.matchID;
  } catch (e) {
    return new NextResponse('Need Body', { status: 400 })
  }

  if (!matchID) {
    return new NextResponse("Bad Match ID", { status: 400 });
  }

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email || !currentUser?.role === 'admin') {
      return new NextResponse("Unauthorizied", { status: 401 })
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
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse('Server Error POST Set', { status: 500 })
  }
}