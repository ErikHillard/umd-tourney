"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MainNav } from "./MainNav";
import { UserNav } from "./UserNav";
import { Button } from "./ui/button";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "Teams", href: "/teams" },
];

export default function Navbar() {
  const session = useSession();
  const [navActive, setNavActive] = useState(null);
  const { data: user, isLoading: userIsLoading } = useQuery({
    queryKey: [`user`],
    queryFn: async () => {
      const { data } = await axios.get("/api/user");
      return data;
    },
    staleTime: 1000, // min TODO later change this so that it will check every 5
  });

  const { data: pools, isLoading: poolsIsLoading } = useQuery({
    queryKey: [`pools`],
    queryFn: async () => {
      const { data } = await axios.get("/api/pools");
      return data;
    },
    staleTime: 1000, // min TODO later change this so that it will check every 5
  });

  const { status } = useSession();


  return (
    <header className="sticky top-0 z-50 bg-inherit">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav
            className="mx-6"
            pools={pools}
            poolsIsLoading={poolsIsLoading}
            isAdmin={user?.role === "admin"}
          />
          <div className="ml-auto flex items-center space-x-4">
            {status === 'authenticated' ? 
              <UserNav user={user} userIsLoading={userIsLoading} /> :
              <Link href="/login"><Button variant="outline">Login</Button></Link>
              }
          </div>
        </div>
      </div>
    </header>
    // <NavigationMenu>
    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <Link href="/" legacyBehavior passHref>
    //         <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //           UMD Club Volleyball
    //         </NavigationMenuLink>
    //       </Link>
    //       <Link href="/teams" legacyBehavior passHref>
    //         <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //           Teams
    //         </NavigationMenuLink>
    //       </Link>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>
  );
}

// const ListItem = (({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   )
// })
// ListItem.displayName = "ListItem"
