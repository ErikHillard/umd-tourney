import Link from "next/link";
import clientPromise from "../lib/mongodb";

async function getTourn() {
  try {
    const client = await clientPromise;
    const db = client.db("MainDB");
    // console.log(pool);

    const team = await db
            .collection("info")
            .find({ type: "info" })
            .sort({ name: -1 })
            .toArray();
    // console.log(team);
    return JSON.parse(JSON.stringify(team))[0];

  } catch (e) {
    console.error(e);
  }
}

export default async function RootLayout({ children }) {
  const tournInfo = await getTourn();
  //console.log(tournInfo.teamNames.length);

  return (
    <html>
      <body>
        <Link href="/pools/">Hello!!!!</Link>
        {children}
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}
