import AuthForm from "./AuthForm";
import Image from "next/image";

export default function AuthPage({}) {
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
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          className="
            text-center
            text-3xl
            font-bold
            tracking-tight
          "
        >
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
