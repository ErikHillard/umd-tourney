import axios from "axios";

export default async function getMatch(matchID) {
  return await axios.get(`/api/matches/${matchID}`)
}