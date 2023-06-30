import { NextResponse } from "next/server"
import prisma from "../../../libs/prismadb";

export async function POST(request, { params }) {
  const name = params.name
  if (!name) {
    return new NextResponse("Need Team Name", { status: 400 })
  }
  const poolId = request.nextUrl.searchParams.get("poolName")
  if (!poolId) {
    return new NextResponse("Need Pool Name", { status: 400 })
  }

  const pool = await prisma.team.create({
    data: {
      name: name,
      format: `0 to whatever`
    }
  })

  // use 

  return NextResponse.json(pool)
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
