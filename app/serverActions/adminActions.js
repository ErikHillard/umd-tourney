'use server'

import { revalidatePath } from "next/cache";
import { createPool, createTeam, generateMatchesForPool, getPool, resetTourney } from "../utils/apiUtils";

export async function createPoolAction(data) {

  // TODO: check pool does not already exist
  var object = {};
  data.forEach((value, key) => object[key] = value);
  const name = `${object.poolNumber}`

  const res = createPool(name);
}

export async function createTeamAction(data) {

  // TODO: need to check for uniqueness here, no symbols, convert spaces to _
  // as well check that the pool exists

  // addTeam(data.get("teamName"), data.get("poolNumber"));

  var object = {};
  data.forEach((value, key) => object[key] = value);
  const res = createTeam(object.teamName, object.poolID)



  // redirect(`/teams/${data.get("teamName")}`);
}

export async function confirm(data) {

  if (data.get("confirm")) {
    // resetTourney()
    await resetTourney();

  }
}

export async function createTestTourney(data) {

  if (data.get("confirm")) {
    await resetTourney();
    const pool1ID = (await (await createPool("Pool 1")).json()).id;
    const pool2ID = (await (await createPool("Pool 2")).json()).id;
    const pool3ID = (await (await createPool("Pool 3")).json()).id;
    const pool4ID = (await (await createPool("Pool 4")).json()).id;

    //Creating Teams
    await (createTeam("Bob 1", pool1ID));
    await (createTeam("Bob 2", pool1ID));
    await (createTeam("Bob 3", pool1ID));
    await (createTeam("Bob 4", pool1ID));

    await (createTeam("Jim 1", pool2ID));
    await (createTeam("Jim 2", pool2ID));
    await (createTeam("Jim 3", pool2ID));
    await (createTeam("Jim 4", pool2ID));

    await (createTeam("Syn 1", pool3ID));
    await (createTeam("Syn 2", pool3ID));
    await (createTeam("Syn 3", pool3ID));
    await (createTeam("Syn 4", pool3ID));

    await (createTeam("Erik 1", pool4ID));
    await (createTeam("Erik 2", pool4ID));
    await (createTeam("Erik 3", pool4ID));
    await (createTeam("Erik 4", pool4ID));

    await (generateMatchesForPool(pool1ID));
    await (generateMatchesForPool(pool2ID));
    await (generateMatchesForPool(pool3ID));
    await (generateMatchesForPool(pool4ID));
  }
}