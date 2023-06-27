'use server'

import { revalidatePath } from "next/cache";

export async function createPool(data) {

  // TODO: check pool does not already exist
  var object = {};
  data.forEach((value, key) => object[key] = value);
  var json = JSON.stringify(object);
  const res = await fetch(`${process.env.APIpath}/api/pool`, {
    method: "POST",
    body: json
  })

  // const { poolNumber } 
  // const { name } = await res.json()
  //Fyi cannot revalidate path here for some reason. Need to do it in the api
  


}

export async function createTeam(data) {

  // TODO: need to check for uniqueness here, no symbols, convert spaces to _
  // as well check that the pool exists

  // addTeam(data.get("teamName"), data.get("poolNumber"));

  redirect(`/teams/${data.get("teamName")}`);
}

export async function confirm(data) {

  if (data.get("confirm")) {
    // resetTourney()
  }
}

export async function createTestTourney(data) {

  if (data.get("confirm")) {
    // setupTestTourney()
  }
}