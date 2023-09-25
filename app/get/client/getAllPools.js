import axios from "axios";

export default async function getAllPools() {
  return await axios.get("/api/pools");
}