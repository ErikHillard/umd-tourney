import { cn } from "@/lib/utils";
import { QueryClient } from "@tanstack/query-core";
import { Moon, Router, Sun } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function UserNav({ className, user, userIsLoading, ...props }) {
  const queryClient = new QueryClient();
  const { status } = useSession();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <div className={cn("flex items-center", className)} {...props}>
      {status === "authenticated" && user?.role === "admin" && (
        <Button asChild variant="ghost">
          <Link
            href={`/admin`}
            className="text-sm font-medium transition-colors hover:text-primary mr-4"
            {...props}
          >
            Admin
          </Link>
        </Button>
      )}
      {/* <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle Theme"
        className="mr-6"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle Theme</span>
      </Button> */}
      {/* TODO Uncomment when we support dark theme */}

      {status === "authenticated" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image} alt="@shadcn" />
                <AvatarFallback delayMs={600}>
                  {user?.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit" align="end" forceMount>
            {!userIsLoading && (
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="outline"
                onClick={() => {
                  queryClient.invalidateQueries([`user`]);
                  signOut();
                }}
              >
                Log Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          onClick={() => router.push("/login")}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage alt="@shadcn" />
            <AvatarFallback delayMs={600}>U</AvatarFallback>
          </Avatar>
        </Button>
      )}
    </div>
  );
}
