import Link from "next/link";
import Navbar from "./components/Navbar";
import "../styles/globals.css"
import Providers from "./utils/provider";

export default async function RootLayout({ children }) {
  
  return (
    <html>
      <body>
        <div className="flex flex-col h-screen">
          <Navbar />
            {children}
        </div>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'UMD Volleyball Tournament Runner',
  description: 'UMD Volleyball Tournament Runner',
}
