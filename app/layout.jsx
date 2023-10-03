import Navbar from "./components/Navbar";
import "../styles/globals.css"
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthConext";
import TanstackProvider from "./utils/TanstackProvider";

export default async function RootLayout({ children }) {

  return (
    <html>
      <body className="bg-gray-100">
        <TanstackProvider>

          <AuthContext>
            <ToasterContext />
            <div className="flex flex-col flex-grow h-screen">
              <Navbar />
              {children}
            </div>
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
