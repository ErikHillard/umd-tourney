"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

export default function PoolTable({ pool }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/6">Team</TableHead>
          <TableHead className="w-2/6 text-center">Wins</TableHead>
          <TableHead className="w-2/6 text-center">Losses</TableHead>
          <TableHead className="w-1/6 text-right">+/-</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pool?.teams?.map((team) => (
          <TableRow key={team.id}>
            <TableCell className="font-medium w-1/6">
              <Button asChild variant="ghost"><Link href={`/teams/${team.id}`} className="transition-colors hover:text-primary">{team.name}</Link></Button>
            </TableCell>
            <TableCell className="w-2/6 text-center">{team.wins}</TableCell>
            <TableCell className="w-2/6 text-center">{team.losses}</TableCell>
            <TableCell className="w-1/6 text-right">{team.pointDiff}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
