import axios from "axios";

export default async function getTeam(teamID) {
  return await axios.get(`/api/teams?id=${teamID}`);
}