import axios from "axios";

export default async function getAllTeams() {
  return await axios.get("/api/teams")
}