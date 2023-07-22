import { NextResponse } from "next/server"
import prisma from "../../libs/prismadb"



export async function GET(request, { params }) {
  const sets = await prisma.set.findMany({
    include: {
      match: {
        include: {
          pool: true,
          teams: true
        }
      }
    }
  })

  return NextResponse.json(sets)
}