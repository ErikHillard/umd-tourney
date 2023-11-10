import { NextResponse } from "next/server"
import getCurrentUser from "@/get/server/getCurrentUser";
import prisma from "@/libs/prismadb";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");

  try {
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
  } catch (e) {
    console.log(e, 'SERVER_ERROR')
    return new NextResponse("Server Error GET Pool", { status: 500});
  }
}

export async function POST(request) {
  let n = ""
  try {
    const body = await request.json()
    n = body.name;
  } catch (e) {
    return new NextResponse('Need Body', { status: 400 })
  }

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email || !currentUser?.role === 'admin') {
      return new NextResponse("Unauthorizied", { status: 401 })
    }

    if (!n) {
      return new NextResponse("Need Pool Name", { status: 400 })
    }

    const pool = await prisma.pool.create({
      data: {
        name: n,
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

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email || !currentUser?.role === 'admin') {
      return new NextResponse("Unauthorizied", { status: 401 })
    }
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
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse("Pools Post Error", { status: 500 });
  }
}