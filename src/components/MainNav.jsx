import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowDownNarrowWide, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import PoolLink from "./PoolLink";
import TeamLink from "./TeamLink";

const MAX_POOLS_DISPLAYED = 4;

function NavBarWide({ pools, ...props }) {}
function NavBarShort({ pools, ...props }) {}
function PoolsInMenu({
  pools,
  iconName,
  className,
  buttonName = "",
  ...props
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Pools
          <ArrowDownNarrowWide className={iconName} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start" forceMount>
        <DropdownMenuItem>
          <Button asChild variant="ghost" className={buttonName}>
            <PoolLink className={className} text={"All Pools"} />
          </Button>
        </DropdownMenuItem>
        {pools.map((pool) => (
          <DropdownMenuItem key={pool.id}>
            <Button asChild variant="ghost" className={buttonName}>
              <PoolLink pool={pool} className={className} text={pool.name} />
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
function PoolsInList({ pools, buttonName, className, ...props }) {
  return pools?.map((pool) => (
    <Button key={pool.id} asChild variant="ghost" className={buttonName}>
      <PoolLink pool={pool} className={className} text={pool.name} />
    </Button>
  ));
}

export function MainNav({
  className,
  pools,
  poolsIsLoading,
  isAdmin,
  ...props
}) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <Sheet>
        <SheetTrigger>
          <Menu className="h-6 md:hidden w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 sm:w-96">
          <nav className="flex flex-col gap-4">
            <Button className="justify-start" asChild variant="ghost">
              <Link
                href={`/teams`}
                className="block px-2 py-1 text-lg transition-colors hover:text-primary"
                {...props}
              >
                Teams
              </Link>
            </Button>

            {!poolsIsLoading && (
              <PoolsInList
                pools={pools}
                buttonName="justify-start"
                className="text-sm font-medium transition-colors hover:text-primary"
              />
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <Link href="/" className="ml-4 lg:ml-0 transition-colors">
        <h1 className="text-xl font-bold transition-colors text-primary">
          UMD Club Volleyball
        </h1>
      </Link>
      <nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:block">
        <Button asChild variant="ghost">
          <Link
            href={`/teams`}
            className="text-sm font-medium transition-colors hover:text-primary"
            {...props}
          >
            Teams
          </Link>
        </Button>
        {!poolsIsLoading && pools.length <= MAX_POOLS_DISPLAYED && (
          <PoolsInList
            pools={pools}
            className="text-sm font-medium transition-colors hover:text-primary"
          />
        )}
        {!poolsIsLoading && pools.length > MAX_POOLS_DISPLAYED && (
          <PoolsInMenu
            pools={pools}
            buttonName="justify-left"
            className={
              "text-sm font-medium transition-colors hover:text-primary"
            }
            iconName="pl-1 h-5 w-5"
          />
        )}
      </nav>

      {/* <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
      >
        <Link
          href="/"
          className="text-lg font-medium transition-colors hover:text-primary"
        >
          UMD Club Volleyball
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Pools</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start" forceMount>
            <Link href={`/pools`}>
              <DropdownMenuItem
                className={
                  "text-md font-medium transition-colors hover:text-primary"
                }
              >
                All Pools
              </DropdownMenuItem>
            </Link>
            {poolsIsLoading ? (
              <p>Pools are still loading</p>
            ) : (
              pools.map((pool) => (
                <Link href={`/pools/${pool.id}`} key={pool.id}>
                  <DropdownMenuItem>
                    <p
                      className={
                        "text-md font-medium transition-colors "
                      }
                    >
                      {pool.name}
                    </p>
                  </DropdownMenuItem>
                </Link>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          href="/teams"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Teams
        </Link>
        {isAdmin && (
          <Link
            href="/admin"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Admin
          </Link>
        )}
      </nav> */}
    </div>
  );
}
