import axios from "axios";

export default async function getPool(poolID) {
  return await axios.get(`/api/pools?id=${poolID}`)
}