import { redirect } from "next/navigation";
import ClientPoolsPage from "../ClientPoolsPage";

export default async function PoolsPage({  }) {
  redirect("/");
  return (
    <></>
  );
}


// This will display all pools, maybe a list and the current games they are running