import { NextResponse } from "next/server"
import prisma from "../../../libs/prismadb";

export async function POST(request, { params }) {
  const name = params.name
  if (!name) {
    return new NextResponse("Need Pool Name", { status: 400 })
  }

  const searchParams = request.nextUrl.searchParams;

  const pool = await prisma.pool.create({
    data: {
      name: name,
      format: `0 to whatever`
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

  return NextResponse.json(teams)
}

export async function GET(request, { params }) {

  const pool = await prisma.pool.findUnique({
    where: {
      name: params.name
    }
  })

  return NextResponse.json(pool)

}

export async function DELETE(request, { params }) {

  const pool = await prisma.pool.delete({
    where: {
      name: params.name
    }
  })

  return NextResponse.json(pool)

}
