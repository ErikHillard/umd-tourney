'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavItem from "./NavItem";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "Teams", href: "/teams" },
];

export default function Navbar() {
  const session = useSession();
  const [navActive, setNavActive] = useState(null);
  const { data } = useQuery({
    queryKey: [`user`],
    queryFn: async () => {
      const { data } = await axios.get("/api/isAdmin");
      return data;
    },
    staleTime: 1000 * 60  * 5 // min TODO later change this so that it will check every 5
  })

  return (
    <header>
      <nav className={`nav bg-white`}>
        <Link href={"/"}>

          <h1 className="logo font-bold">UMD Tournament Runner</h1>

        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {data && data?.isAdmin && <NavItem text="Admin" href="/admin" />}
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem {...menu} />
            </div>
          ))}
          {(session?.status === 'authenticated') ?
            <div
              onClick={() => {
                setNavActive(false);
              }}
              key="Logout"
            >
              <NavItem text="Logout" href="/logout" />
            </div> 
            :
            <div
              onClick={() => {
                setNavActive(false);
              }}
              key="Login"
            >
              <NavItem text="Login" href="/login" />
            </div>}
        </div>
      </nav>
    </header>
  );
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-fill flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UMD Tournament Runner</span>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/admin" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Admin</Link>
            </li>
            {/* <li>
                <Link href="/pools" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Pools</Link>
              </li> */}
            <li>
              <Link href="/teams" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Teams</Link>
            </li>
            <li>
              <Link href="/login" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
}