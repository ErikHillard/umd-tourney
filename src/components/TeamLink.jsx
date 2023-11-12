import Link from "next/link";

export default function TeamLink({ team, className, text, ...props }) {
  const link = team === null || team === undefined ? "/teams" : `/teams/${team.id}`;
  return (
    <Link href={link} className={className} {...props}>
      {text}
    </Link>
  );
}