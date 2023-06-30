import Link from "next/link";
// import { useState } from "react";
// import { getAllPools } from "../../utils/apiUtils";

export default async function Navbar(  ) {

  const pools = await (await fetch(`${process.env.APIpath}/api/pool`, { next: { revalidate: 100 } })).json();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="min-w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UMD Tournament Runner</span>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/admin" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Admin</Link>
            </li>
            <li>
              <Link href="/pools" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Pools</Link>
            </li>
            {pools.map((pool) => (
            <div key={pool.name}>
              <li>
                <Link href={"/pools/" + pool.name} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{"Pool " + pool.name.charAt(pool.name.length - 1)}</Link>
              </li>
            </div>
        ))}
            <li>
              <Link href="/teams" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Teams</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    // <div>
    //   <ul>
    //     {pools.map((pool) => (
    //         <li>
    //             <h2>{pool.poolName}</h2>
    //         </li>
    //     ))}
    //   </ul>
    // </div>
  );
}