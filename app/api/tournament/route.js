import { NextResponse } from "next/server"
import { createPool, createTeam, generateMatchesForPool } from "../../actions/create";
import getCurrentUser from "../../get/server/getCurrentUser";

import prisma from "../../libs/prismadb";

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email || !currentUser?.role === 'admin') {
      return new NextResponse("Unauthorizied", { status: 401 })
    }

    const pool1 = await createPool("Pool 1");
    const pool2 = await createPool("Pool 2");
    const pool3 = await createPool("Pool 3");
    const pool4 = await createPool("Pool 4");

    await createTeam("Bob 1", pool1.id);
    await createTeam("Bob 2", pool1.id);
    await createTeam("Bob 3", pool1.id);
    await createTeam("Bob 4", pool1.id);

    await (createTeam("Jim 1", pool2.id));
    await (createTeam("Jim 2", pool2.id));
    await (createTeam("Jim 3", pool2.id));
    await (createTeam("Jim 4", pool2.id));

    await (createTeam("Syn 1", pool3.id));
    await (createTeam("Syn 2", pool3.id));
    await (createTeam("Syn 3", pool3.id));
    await (createTeam("Syn 4", pool3.id));

    await (createTeam("Erik 1", pool4.id));
    await (createTeam("Erik 2", pool4.id));
    await (createTeam("Erik 3", pool4.id));
    await (createTeam("Erik 4", pool4.id));

    await (generateMatchesForPool(pool1.id));
    await (generateMatchesForPool(pool2.id));
    await (generateMatchesForPool(pool3.id));
    await (generateMatchesForPool(pool4.id));

    return NextResponse.json({})
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse("Pools Post Error", { status: 500 });
  }
}