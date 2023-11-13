"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useMemo } from "react";
import { toast } from "react-hot-toast";
import { notFound } from "next/navigation";
import axios from "axios";
import { compareTeamsForOverallTeams } from "@/utils/compare";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ClientTeamsPage({}) {
  const { data, isError, isInitialLoading, isLoading, error } = useQuery({
    queryKey: [`teams`],
    queryFn: async () => {
      const { data } = await axios.get("/api/teams");
      return data;
    },
  });

  const teams = useMemo(
    () => (isLoading ? null : data.toSorted(compareTeamsForOverallTeams)),
    [data, isLoading]
  );

  if (isError) {
    toast.error("We couldn't pull the teams right now sorry!");
    console.log(error);
    notFound();
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <h1 className="mb-6 text-4xl font-bold">Teams</h1>
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
          {teams?.map((team) => (
            <TableRow key={team.id}>
              <TableCell className="font-medium w-1/6">
                <Link href={`/teams/${team.id}`}>{team.name}</Link>
              </TableCell>
              <TableCell className="w-2/6 text-center">{team.wins}</TableCell>
              <TableCell className="w-2/6 text-center">{team.losses}</TableCell>
              <TableCell className="w-1/6 text-right">
                {team.pointDiff}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
