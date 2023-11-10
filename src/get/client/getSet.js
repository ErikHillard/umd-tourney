import axios from "axios";

export default async function getSet(setID) {
  return await axios.get(`/api/sets/${setID}`)
}