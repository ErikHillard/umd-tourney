import { NextResponse } from "next/server"
import prisma from "../../../libs/prismadb";

export async function GET(request, { params }) {

  const team = await prisma.team.findUnique({
    where: {
      id: params.id
    }
  })

  if (!team) {
    return new NextResponse("Need Team ID", { status: 400 })
  }

  return NextResponse.json(team)

}

export async function POST(request, { params }) {
  const name = params.id
  console.log(`Name: ${name}`)
  if (!name) {
    return new NextResponse("Need Team Name", { status: 400 })
  }
  const poolID = request.nextUrl.searchParams.get("poolID")
  console.log(`Pool Id: ${poolID}`)
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

  const pool = await prisma.pool.delete({
    where: {
      name: params.name
    }
  })

  return NextResponse.json(pool)

}
