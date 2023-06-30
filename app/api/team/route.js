import { NextResponse } from "next/server"
import prisma from "../../libs/prismadb";

export async function GET(request) {
  const teams = await prisma.team.findMany()

  return NextResponse.json(pools)

}

export async function DELETE(request) {

  const teams = await prisma.team.deleteMany({})

  return NextResponse.json(pools)

}
