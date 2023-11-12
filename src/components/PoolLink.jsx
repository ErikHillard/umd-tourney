import Link from "next/link";

const PoolLink = ({ pool, className, text, ...props }) => {
  const link = pool === null || pool === undefined ? "/pools" : `/pools/${pool.id}`;
  return (
    <Link href={link} className={className} {...props}>
      {text}
    </Link>
  );
}

PoolLink.displayName = "PoolLink"
export default PoolLink;
