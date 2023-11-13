import { cn } from "@/lib/utils";

const Container = ({ children, className="" }) => {
  return <div className={cn("mx-auto w-full max-w-7xl", className)}>{children}</div>;
};

export default Container;
