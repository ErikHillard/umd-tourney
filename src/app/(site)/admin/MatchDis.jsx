import clsx from "clsx";
import Link from "next/link";
import React, { useImperativeHandle, useMemo, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/inputs/Input";

const MatchDis = React.forwardRef(
  (
    {
      match,
      deletingIDs,
      poolDeleting,
      addChangingID,
      addDeletingID,
      removeDeletingID,
    },
    ref
  ) => {
    const [sets, setSets] = useState(match.sets);

    const deleting = useMemo((
      () =>
        poolDeleting ||
        match.id in deletingIDs ||
        match.team1.id in deletingIDs ||
        match.team2.id in deletingIDs ||
        match.workTeam.id in deletingIDs
        ),
      [poolDeleting, deletingIDs]
    );

    const handleTeam1ScoreChange = (event) => {
      addChangingID(match.id, ["match", match.sets.length, event.target.value]);
      // setName(event.target.value);
    };
    const handleTeam2ScoreChange = (event) => {
      addChangingID(match.id, ["match", match.sets.length, event.target.value]);
      // setName(event.target.value);
    };

    const handleRemoveDeleteID = (event) => {
      removeDeletingID(match.id);
    };
    const handleDeleteID = (event) => {
      addDeletingID(match.id, 'match');
    };

    const reset = () => {
      setSets(match.sets);
    };

    useImperativeHandle(ref, () => ({
      reset,
    }));

    return (
      <div
        className={clsx(
          "m-3 border rounded p-3 shadow-md flex flex-col justify-between items-center",
          deleting && "opacity-50",
          deleting && "bg-red-300"
        )}
      >
        <div className="flex flex-row w-full justify-between items-center mb-2">
          <p className="font-bold">Match {match.index + 1}</p>
          {deleting ? (
            <Button type="button" onClick={handleRemoveDeleteID}>
              Cancel Delete
            </Button>
          ) : (
            <Button type="button" danger={true} onClick={handleDeleteID}>
              Delete Match
            </Button>
          )}
        </div>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 table-fixed">
              <thead className=" text-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="w-20 py-3 bg-gray-50 dark:bg-gray-800"
                  >
                    Set #
                  </th>
                  <th scope="col" className="py-3">
                    <Link href={`/teams/${match.team1.id}`}>
                      {match.team1.name}
                    </Link>
                  </th>
                  <th scope="col" className="py-3 bg-gray-50 dark:bg-gray-800">
                    <Link href={`/teams/${match.team2.id}`}>
                      {match.team2.name}
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {match.sets.map((set, index) => (
                  <tr
                    className="border-b border-gray-200 dark:border-gray-700"
                    key={set.id}
                  >
                    <th
                      scope="row"
                      className="py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                      Set {index + 1}
                    </th>
                    <td className="py-4 w-1/2">
                      <Input
                        id={`${index}`}
                        type="text"
                        value={sets[index].team1Score}
                        onChange={handleTeam1ScoreChange}
                      />
                    </td>
                    <td className={`py-4 w-1/2  dark:bg-gray-800`}>
                      <Input
                        id={`${index}`}
                        type="text"
                        value={sets[index].team2Score}
                        onChange={handleTeam1ScoreChange}
                      />
                    </td>
                  </tr>
                ))}
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <p className="italic">{`Working:`}</p>
                  </th>
                  <td colSpan={2} className="py-4">
                    <Link
                      className="italic"
                      href={`/teams/${match.workTeam.id}`}
                    >
                      {match.workTeam.name}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);

export default MatchDis;
