import { NextResponse } from "next/server"
import prisma from "../../../libs/prismadb";

export async function GET(request, { params }) {
  const pool = await prisma.pool.findUnique({
    where: {
      id: params.id
    },
    include: {
      teams: true,
      matches: {
        include: {
          teams: true,
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

export async function POST(request, { params }) {
  const name = params.id
  if (!name) {
    return new NextResponse("Need Pool Name", { status: 400 })
  }

  const searchParams = request.nextUrl.searchParams;

  const pool = await prisma.pool.create({
    data: {
      name: name,
    }
  })
  const teams = []
  for (const teamName of searchParams.values()) {
    teams.push(await prisma.team.create({
      data: {
        name: teamName,
        pool: {
          connect: {
            id: pool.id
          }
        }
      }
    }))
  }

  // use 

  return NextResponse.json(pool)
}

export async function DELETE(request, { params }) {

  const pool = await prisma.pool.delete({
    where: {
      id: params.id
    }
  })

  return NextResponse.json(pool)

}
