import Navbar from "@/components/Navbar"; 
import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"
import ToasterContext from "@/context/ToasterContext";
import AuthContext from "@/context/AuthConext";
import TanstackProvider from "@/utils/TanstackProvider";
import { cn } from "@/lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default async function RootLayout({ children }) {

  return (
    <html>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <TanstackProvider>

          <AuthContext>
            <ToasterContext />
            <>
              <Navbar />
              {children}
            </>
          </AuthContext>
        </TanstackProvider>

      </body>
    </html>
  )
}

export const metadata = {
  title: 'UMD Volleyball Tournament Runner',
  description: 'UMD Volleyball Tournament Runner',
}
