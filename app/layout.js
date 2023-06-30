import Link from "next/link";
import Navbar from "./components/Navbar";
// import { getAllPools } from "../utils/apiUtils";
import "../styles/globals.css"
import Providers from "./utils/provider";

export default async function RootLayout({ children }) {
  
  return (
    <html>
      <body>
        <Navbar />
        {/* Providers is there for react query to update dynamically on screen */}
        {/* <Providers> */}
          {children}
        {/* </Providers> */}
      </body>
    </html>
  )
}

export const metadata = {
  title: 'UMD Volleyball Tournament Runner',
  description: 'UMD Volleyball Tournament Runner',
}
