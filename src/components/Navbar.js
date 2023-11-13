"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { MainNav } from "./MainNav";
import { UserNav } from "./UserNav";
import { Button } from "./ui/button";
import Container from "./ui/container";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useTheme } from "next-themes";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "Teams", href: "/teams" },
];


export default function Navbar() {
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


  return (
    <header className="sticky top-0 z-50 bg-inherit sm:flex sm:justify-between p-3 border-b">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 flex h-12 items-center justify-between w-full">
          <MainNav
            className="flex items-center"
            pools={pools}
            poolsIsLoading={poolsIsLoading}
            isAdmin={user?.role === "admin"}
          />
          <UserNav
            className="flex items-center"
            user={user}
            userIsLoading={userIsLoading}
          />
        </div>
      </Container>
    </header>
  );
}
