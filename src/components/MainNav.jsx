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

export function MainNav({
  className,
  pools,
  poolsIsLoading,
  isAdmin,
  ...props
}) {
  return (
    <nav
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
                <DropdownMenuItem
                  
                >
                  <p className={
                    "text-md font-medium transition-colors hover:text-primary"
                  }>{pool.name}</p>
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
    </nav>
  );
}
