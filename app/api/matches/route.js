import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";
import getCurrentUser from "../../get/server/getCurrentUser";


export async function GET(request, { params }) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      const matches = await prisma.match.findMany({
        include: {
          pool: true,
          teams: true,
          sets: true,
        }
      })

      return NextResponse.json(matches)
    } else {
      const match = await prisma.match.findUnique({
        where: {
          id: id
        },
        include: {
          pool: true,
          teams: true,
          sets: true
        }
      })

      return NextResponse.json(match)
    }
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse('Failed Obtaining Match', { status: 500 });
  }

}

export async function POST(request) {
  let poolID = team1ID = team2ID = team3ID = "";
  try {
    ({ poolID, team1ID, team2ID, team3ID } = await request.json())
  } catch (e) {
    return new NextResponse('Need Body', { status: 400 })
  }

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email || !currentUser?.role === 'admin') {
      return new NextResponse("Unauthorizied", { status: 401 })
    }

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
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse('Server Error Post Match', { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email || !currentUser?.role === 'admin') {
      return new NextResponse("Unauthorizied", { status: 401 })
    }

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      const ms = await prisma.match.deleteMany({});
      return NextResponse.json(ms);
    } else {
      const deleted = await prisma.match.delete({
        where: {
          id: id
        }
      })
      return NextResponse.json(deleted)
    }
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse('Failed Deleting Match', { status: 500 });
  }
}