import { NextResponse } from "next/server"
import { getCurrentUser } from "../../actions/get";
import prisma from "../../libs/prismadb";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
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
  const pool = await prisma.pool.findUnique({
    where: {
      id: id
    },
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

  if (!pool) {
    return new NextResponse("Need Pool Name", { status: 400 })
  }
  return NextResponse.json(pool)
}

export async function POST(request) {
  let name = ""
  try {
    const body = await request.json()
    name = body.name;
  } catch (e) {
    return new NextResponse('Need Body', { status: 400 })
  }
  
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorizied", { status: 401 })
    }

    if (!name) {
      return new NextResponse("Need Pool Name", { status: 400 })
    }

    const pool = await prisma.pool.create({
      data: {
        name: name,
      }
    })

    return NextResponse.json(pool)
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse("Pools Post Error", { status: 500 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    const pools = await prisma.pool.deleteMany({})

    return NextResponse.json(pools)
  }

  const pool = await prisma.pool.delete({
    where: {
      id: id
    }
  })

  return NextResponse.json(pool)

}

// TODO Create post that just creates a pool with no team name

