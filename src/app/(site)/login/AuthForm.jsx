'use client';

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { Button } from "@/components/ui/button";
import Input from "@/components/inputs/Input";
import { BsGoogle } from "react-icons/bs"
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function AuthForm({ }) {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [variant, setVariant] = useState('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/')
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', data))
      .then(queryClient.invalidateQueries(['user']))
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid Credentials');
        }

        if (!callback?.error && callback?.ok) {
          toast.success('Logged in!');
        }
      })
      .then(() => queryClient.invalidateQueries(['user']))
      .finally(() => setIsLoading(false));
    }
  }

  const socialAction = (action) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
    .then((callback) => {
      if (callback?.error) {
        toast.error('Invalid Credentials');
      }

      if (!callback?.error && callback?.ok) {
        toast.success('Logged in!');
      }
    })
    .then(() => queryClient.invalidateQueries(['user']))
    .finally(() => setIsLoading(false));
  }

  return (
    <div>
      <div
        className="
          mt-8
          sm:mx-auto
          sm:w-full
          sm:max-w-md
        "
      >
        <div
          className="
            px-4
            py-8
            shadow-md border-2
            rounded-lg
            sm:px-10
          ">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input id="email" label="Email Address" type="email" register={register} errors={errors} disabled={isLoading}/>
            <Input id="password" label="Password" type="password" register={register} errors={errors} disabled={isLoading}/>
            <Button disabled={isLoading} className="w-full" type="submit">{'Sign in'}</Button>
            
          </form>

          <div className="mt-6">
            <div className="relative">
              <div 
                className="
                  absolute 
                  inset-0 
                  flex 
                  items-center
                "
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <AuthSocialButton 
                icon={BsGoogle}
                onClick={() => socialAction('google')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // return (
  //   <div>
  //     <div
  //       className="
  //         mt-8
  //         sm:mx-auto
  //         sm:w-full
  //         sm:max-w-md
  //       "
  //     >
  //       <div
  //         className="
  //           bg-white
  //           px-4
  //           py-8
  //           shadow
  //           sm:rounded-lg
  //           sm:px-10
  //         ">
  //         <form
  //           className="space-y-6"
  //           onSubmit={handleSubmit(onSubmit)}
  //         >
            
  //           {variant === "REGISTER" && (
  //             <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading}/>
  //           )}
  //           <Input id="email" label="Email Address" type="email" register={register} errors={errors} disabled={isLoading}/>
  //           <Input id="password" label="Password" type="password" register={register} errors={errors} disabled={isLoading}/>
  //           <Button disabled={isLoading} fullWidth type="submit">{variant === 'LOGIN' ? 'Sign in' : 'Register'}</Button>
            
  //         </form>

  //         <div className="mt-6">
  //           <div className="relative">
  //             <div 
  //               className="
  //                 absolute 
  //                 inset-0 
  //                 flex 
  //                 items-center
  //               "
  //             >
  //               <div className="w-full border-t border-gray-300" />
  //             </div>
  //             <div className="relative flex justify-center text-sm">
  //               <span className="bg-white px-2 text-gray-500">
  //                 Or continue with
  //               </span>
  //             </div>
  //           </div>
  //           <div className="mt-6 flex gap-2">
  //             <AuthSocialButton 
  //               icon={BsGoogle}
  //               onClick={() => socialAction('google')}
  //             />
  //           </div>
  //         </div>

  //         <div className="
  //           flex
  //           gap-2
  //           justify-center
  //           text-sm
  //           mt-6
  //           pt-2
  //           text-gray-500
  //         ">
  //           <div>
  //             {variant === 'LOGIN' ? 'New to UMD Club Volleyball?' : 'Already have an account?'}
  //           </div>

  //           <div
  //             onClick={toggleVariant}
  //             className="underline cursor-pointer"
  //           >
  //             {variant === 'LOGIN' ? 'Create an account' : 'Login'}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}