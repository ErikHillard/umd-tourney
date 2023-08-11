import { getServerSession } from "next-auth";
import prisma from "../libs/prismadb";
import { authOptions } from "./../api/auth/[...nextauth]/route";

const REVALIDATION_TIME = 1;

export async function getAllTeams() {
  try {
    const teams = await (await fetch(`${process.env.APIpath}/api/teams`, {
      cache: 'no-store',
      next: {
        tags: ['teams']
      }
    })).json();
    return teams;
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return [];
  }
}

export async function getAllPools() {
  try {
    const pools = await (await fetch(`${process.env.APIpath}/api/pools`, {
      cache: 'no-store',
      next: {
        tags: ['pools'],
      }
    })).json();
    return pools;
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return [];
  }
}

export async function getTeam(teamID) {
  try {
    const team = await (await fetch(`${process.env.APIpath}/api/teams/?id=${teamID}`, {
      next: {
        revalidate: REVALIDATION_TIME,
        tags: [teamID]
      }
    })).json();

    return team;
  } catch (e) {
    console.log(e, 'SERVER_ERROR');
    return {};
  }
}

export async function getPool(poolID) {
  try {
    const pool = await (await fetch(`${process.env.APIpath}/api/pools?id=${poolID}`, {
      next: {
        revalidate: REVALIDATION_TIME,
        tags: [poolID],
      }
    })).json();
    return pool;
  } catch (e) {
    console.log(e, 'getPoolError');
    return {};
  }
}

export async function getMatch(matchID) {
  try {
    const match = await (await fetch(`${process.env.APIpath}/api/matches/${matchID}`, {
      next: {
        revalidate: REVALIDATION_TIME,
        tags: [matchID]
      }
    })).json();
    return match;
  } catch (e) {
    console.log(e, 'SERVER_ERROR')
    return {};
  }
}

export async function getSet(setID) {
  try {
    const set = await (await fetch(`${process.env.APIpath}/api/sets/${setID}`, {
      next: {
        revalidate: REVALIDATION_TIME,
        tags: [setID]
      }
    })).json();
    return set;
  } catch (e) {
    console.log(e, 'SERVER_ERROR')
    return {};
  }
}

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (e) {
    return null;
  }
}