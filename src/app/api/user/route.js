export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import getCurrentUser from "@/get/server/getCurrentUser";

export async function GET(request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return NextResponse.json({})
    }
    return NextResponse.json({role: currentUser.role, name: currentUser.name, email: currentUser.email, image: currentUser.image})
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return new NextResponse("Pools Post Error", { status: 500 });
  }
}