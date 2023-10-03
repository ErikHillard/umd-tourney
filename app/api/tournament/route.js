import { NextResponse } from "next/server"
import { createPool, createTeam, generateMatchesForPool } from "../../actions/create";
import getCurrentUser from "../../get/server/getCurrentUser";

export async function POST(request) {
  let pool1;
  let pool2;
  let pool3;
  let pool4;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email || !currentUser?.role === 'admin') {
      return new NextResponse("Unauthorizied", { status: 401 })
    }

    pool1 = await createPool("Pool 1");
    pool2 = await createPool("Pool 2");
    pool3 = await createPool("Pool 3");
    pool4 = await createPool("Pool 4");
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse("Pools Post Error", { status: 500 });
  }
  try {
    await createTeam("Bob 1", pool1.id);
    await createTeam("Bob 2", pool1.id);
    await createTeam("Bob 3", pool1.id);
    await createTeam("Bob 4", pool1.id);
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse("Teams Bob Post Error", { status: 501 });
  }
  try {
    await (createTeam("Jim 1", pool2.id));
    await (createTeam("Jim 2", pool2.id));
    await (createTeam("Jim 3", pool2.id));
    await (createTeam("Jim 4", pool2.id));
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse("Teams Jim Post Error", { status: 502 });
  }
  try {
    await (createTeam("Syn 1", pool3.id));
    await (createTeam("Syn 2", pool3.id));
    await (createTeam("Syn 3", pool3.id));
    await (createTeam("Syn 4", pool3.id));
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse("Teams Syn Post Error", { status: 503 });
  }
  try {
    await (createTeam("Erik 1", pool4.id));
    await (createTeam("Erik 2", pool4.id));
    await (createTeam("Erik 3", pool4.id));
    await (createTeam("Erik 4", pool4.id));
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse("Teams Erik Post Error", { status: 504 });
  }
  try {
    await (generateMatchesForPool(pool1.id));
    await (generateMatchesForPool(pool2.id));
    await (generateMatchesForPool(pool3.id));
    await (generateMatchesForPool(pool4.id));
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse("Matches Post Error", { status: 505 });
  }
  return NextResponse.json({})
}