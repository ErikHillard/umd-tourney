import AuthForm from "../components/AuthForm";
import Image from "next/image";

export default function AuthPage( {} ) {
  return (
    <div
      className="
        flex
        flex-col
        flex-grow
        justify-center
        py-12
        sm:px-6
        lg:px-8
        bg-gray-100
      ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          className="
            text-center
            text-3xl
            font-bold
            tracking-tight
            text-gray-900
          ">
            Sign in to your account
        </h2>
      </div>
      <AuthForm suppressHydrationWarning/>
    </div>
  )
}