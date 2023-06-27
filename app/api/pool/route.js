import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server"
import prisma from "../../libs/prismadb";

export async function POST(request) {
  const body = await request.json();
  const {
    poolNumber
  } = body;
  if (!poolNumber) {
    return new NextResponse("Need Pool Number", { status: 400 })
  }

  const pool = await prisma.pool.create({
    data: {
      name: `pool${poolNumber}`,
      format: `0 to whatever`
    }
  })

  await revalidatePath(`/pools/pool${poolNumber}`)

  return NextResponse.json(pool)
}

export async function GET(request) {
  // const body = await request.json();
  // const {
  //   poolNumber
  // } = body;
  // if (!poolNumber) {
  //   return new NextResponse("Need Pool Number", { status: 400 })
  // }

  const pool = await prisma.pool.findUnique({
    where: {
      name: `pool1`
    }
  })

  // const pool = await prisma.pool.create({
  //   data: {
  //     name: `pool1`,
  //     format: `0 to whatever`
  //   }
  // })

  return NextResponse.json(pool)

}