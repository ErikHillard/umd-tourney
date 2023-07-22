'use server'

import { revalidatePath } from "next/cache";
import { createPool, createTeam, generateMatchesForPool, resetTourney } from "../utils/apiUtils";

export async function createPoolAction(data) {

  // TODO: check pool does not already exist
  var object = {};
  data.forEach((value, key) => object[key] = value);
  const name = `Pool_${object.poolNumber}`

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
    const pool1ID = (await (await createPool("Pool_1")).json()).id;
    const pool2ID = (await (await createPool("Pool_2")).json()).id;
    const pool3ID = (await (await createPool("Pool_3")).json()).id;
    const pool4ID = (await (await createPool("Pool_4")).json()).id;

    //Creating Teams
    await (createTeam("Bob1", pool1ID));
    await (createTeam("Bob2", pool1ID));
    await (createTeam("Bob3", pool1ID));
    await (createTeam("Bob4", pool1ID));

    await (createTeam("Jim1", pool2ID));
    await (createTeam("Jim2", pool2ID));
    await (createTeam("Jim3", pool2ID));
    await (createTeam("Jim4", pool2ID));

    await (createTeam("Syn1", pool3ID));
    await (createTeam("Syn2", pool3ID));
    await (createTeam("Syn3", pool3ID));
    await (createTeam("Syn4", pool3ID));

    await (createTeam("Erik1", pool4ID));
    await (createTeam("Erik2", pool4ID));
    await (createTeam("Erik3", pool4ID));
    await (createTeam("Erik4", pool4ID));

    await (generateMatchesForPool(pool1ID));    
  }
}