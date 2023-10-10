export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import getCurrentUser from "../../get/server/getCurrentUser";

export async function GET(request) {
  try {
    const currentUser = await getCurrentUser();
    return NextResponse.json({isAdmin: !(!currentUser?.id || !currentUser?.email || !currentUser?.role === 'admin')})
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse("Pools Post Error", { status: 500 });
  }
}