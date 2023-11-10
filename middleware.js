import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token }) => {
      console.log(token, "Hit the middlewear");
      return token?.role === "admin";
    },
  },
});

export const config = {
  matcher: ["/admin/:path*", "/logout/:path*"],
};
