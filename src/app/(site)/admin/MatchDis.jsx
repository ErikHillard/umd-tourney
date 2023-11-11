import clsx from "clsx";
import Link from "next/link";
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Button from "@/components/Button";
import Input from "@/components/inputs/Input";

export default function MatchDis({
  match,
  deletingIDs,
  poolDeleting,
  addChangingID,
  addDeletingID,
  removeDeletingID,
  reset,
}) {
  const [sets, setSets] = useState(match.sets);

  const deleting = useMemo(
    () =>
      poolDeleting ||
      match.id in deletingIDs ||
      match.team1.id in deletingIDs ||
      match.team2.id in deletingIDs ||
      match.workTeam.id in deletingIDs,
    [poolDeleting, deletingIDs, match.id, match.team1.id, match.workTeam.id]
  );

  useEffect(() => {
    setSets(match.sets);
  }, [reset]);

  const handleTeamScoreChange = (event, index, teamNumber) => {
    addChangingID(match.id, ["match", match.id, teamNumber, index, event.target.value]);
    const newSets = [...sets];
    const teamName = (teamNumber === 1) ? "team1Score" : "team2Score";
    newSets[index] = {...sets[index], [teamName]: event.target.value}
    setSets(newSets);
  };

  const handleRemoveDeleteID = (event) => {
    removeDeletingID(match.id);
  };
  const handleDeleteID = (event) => {
    addDeletingID(match.id, "match");
  };

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
                      id={`1${index}${match.id}`}
                      type="text"
                      value={sets[index].team1Score}
                      onChange={e => handleTeamScoreChange(e, index, 1)}
                    />
                  </td>
                  <td className={`py-4 w-1/2  dark:bg-gray-800`}>
                    <Input
                      id={`2${index}${match.id}`}
                      type="text"
                      value={sets[index].team2Score}
                      onChange={e => handleTeamScoreChange(e, index, 2)}
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
                  <Link className="italic" href={`/teams/${match.workTeam.id}`}>
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
