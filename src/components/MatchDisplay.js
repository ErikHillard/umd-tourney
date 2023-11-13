"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function MatchDisplay({ match }) {
  const router = useRouter();
  // TODO disable on set 2 being finished
  return (
    <>
      <div className="flex justify-center mb-3 w-full text-center items-center">
        <h3 className="text-2xl font-bold">{`Match ${match.index + 1}`}</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-3/12">Set</TableHead>
            <TableHead className="text-center">
              <Button
                asChild
                variant="ghost"
                className="transition-colors hover:text-primary"
              >
                <Link href={`/teams/${match.team1.id}`}>
                  {match.team1.name}
                </Link>
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button
                asChild
                variant="ghost"
                className="transition-colors hover:text-primary"
              >
                <Link href={`/teams/${match.team2.id}`}>
                  {match.team2.name}
                </Link>
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {match?.sets?.map((set, index) => (
            <TableRow key={set.id}>
              <TableCell className="font-medium w-2/12">
                Set {index + 1}
              </TableCell>
              <TableCell className="text-center">{set.team1Score}</TableCell>
              <TableCell className="text-center">{set.team2Score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className="italic">
          Working:
          <Button
            asChild
            variant="ghost"
            className="transition-colors hover:text-primary"
          >
            <Link
              
              href={`/teams/${match.workTeam.id}`}
            >
              {match.workTeam.name}
            </Link>
          </Button>
        </TableCaption>
      </Table>

      {/* Make this into a button that is disabled on match.finished? */}
      <div className="flex items-center justify-center my-3">
        <Button
          onClick={() => router.push(`/matches/${match.id}`)}
          disabled={match.finished}
          className="w-full md:w-96"
        >
          Input Scores
        </Button>
      </div>
    </>
  );
}
