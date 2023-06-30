import { NextResponse } from "next/server"
import prisma from "../../libs/prismadb";

export async function GET(request) {
  const pools = await prisma.pool.findMany()

  return NextResponse.json(pools)

}

export async function DELETE(request) {

  const pools = await prisma.pool.deleteMany({})

  return NextResponse.json(pools)

}

