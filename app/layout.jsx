import Navbar from "./components/Navbar";
import "../styles/globals.css"
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthConext";

export default async function RootLayout({ children }) {
  
  return (
    <html>
      <body>
        <AuthContext>
        <ToasterContext />
          <div className="flex flex-col h-screen">
            
            <Navbar />
            
              {children}
          </div>
        </AuthContext>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'UMD Volleyball Tournament Runner',
  description: 'UMD Volleyball Tournament Runner',
}
