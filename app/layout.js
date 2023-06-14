import Link from "next/link";
import Navbar from "../components/Navbar";
import clientPromise from "../lib/mongodb";
import { getAllPools } from "../utils/apiUtils";
import "../styles/globals.css"



export default async function RootLayout({ children }) {
  
  return (
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}
