import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";


export async function GET(request, { params }) {
  const match = await prisma.match.findUnique({
    where: {
      id: params.id
    },
    include: {
      pool: true,
      teams: true,
      sets: true
    }
  })

  return NextResponse.json(match)
}

export async function DELETE(request, { params }) {
  const match = await prisma.match.findUnique({
    where: {
      id: params.id
    },
  })
  
  // TODO See if when you delete a team do you need to update team2 or work teams match arrays
  // await prisma.match.update({
  //   where: {
  //     id: params.id
  //   },
  //   data: {
  //     teams: {
  //       disconnect: [{ id: match.teamIDs[0] }, { id: match.teamIDs[1] }, { id: match.teamIDs[2] }]
  //     }
  //   }
  // })

  const deleted = await prisma.match.delete({
    where:{
      id: params.id
    }
  })

  return NextResponse.json(deleted)
}