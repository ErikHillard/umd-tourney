import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";


export async function GET(request, { params }) {
  const matches = await prisma.match.findMany({
    include: {
      pool: true,
      teams: true,
      sets: true,
    }
  })

  return NextResponse.json(matches)
}

export async function DELETE(request, { params }) {
  // const matches = await prisma.match.findMany({
  //   include: {
  //     teams: true
  //   }
  // })

  // matches.forEach(async match => {
  //   // Need to first disconnect the teams from the match since it is a many-many relation
  //   await prisma.match.update({
  //     where: {
  //       id: match.id
  //     },
  //     data: {
  //       teams: {
  //         disconnect: [{ id: match.teamIDs[0] }, { id: match.teamIDs[1] }, { id: match.teamIDs[2] }]
  //       }
  //     }
  //   })
  
  //   const deleted = await prisma.match.delete({
  //     where:{
  //       id: match.id
  //     }
  //   })
  // });

  const ms = await prisma.match.deleteMany({});

  return NextResponse.json(ms);
}