"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import MatchDis from "./MatchDis";
import TeamDis from "./TeamDis";

const PoolDis = ({ pool }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [sets, setSets] = useState(pool.sets);
  const [points, setPoints] = useState(pool.pointsPerSet);
  const [deletingIDs, setDeletingIDs] = useState({});
  const [changingIDs, setChangingIDS] = useState({});

  const refs = [];

  const deleting = useMemo(
    () => pool.id in deletingIDs,
    [deletingIDs, pool.id]
  );

  const applyChanges = () => {};

  const addDeletingID = (id, info) => {
    setDeletingIDs({
      ...deletingIDs,
      [id]: info,
    });
  };

  const removeDeletingID = (id) => {
    const updated = { ...deletingIDs };
    delete updated[id];
    setDeletingIDs(updated);
  };

  const addChangingID = (id, info) => {
    setChangingIDS({
      ...changingIDs,
      [id]: info,
    });
  };

  const removeChangingID = (id) => {
    const updated = { ...changingIDs };
    delete updated[id];
    setChangingIDs(updated);
  };

  const handleDeleteID = () => {
    addDeletingID(pool.id, "pool");
  };

  const handleRemoveDeleteID = () => {
    removeDeletingID(pool.id);
  };

  const handleSetsChange = (event) => {
    addChangingID(pool.id, ["pool", event.target.value, points]);
    setSets(event.target.value);
  };

  const handlePointsChange = (event) => {
    addChangingID(pool.id, ["pool", sets, event.target.value]);
    setPoints(event.target.value);
  };

  const resetValues = () => {
    refs.forEach((ref) => {
      ref.current.reset();
    });
    setChangingIDS({});
    setDeletingIDs([]);
    setPoints(pool.pointsPerSet);
    setSets(pool.sets);
  };

  return (
    <div
      className={clsx(
        "m-6 border rounded p-3 shadow-md flex flex-col",
        deleting && "bg-red-300"
      )}
    >
      <div
        className={clsx(
          "flex flex-row items-center justify-between",
          deleting && "opacity-50"
        )}
      >
        {/* Pool Description */}
        <div className="flex flex-col max-w-fit items-center">
          {/* Info */}
          <Link className="mr-3 font-bold text-3xl" href={`/pools/${pool.id}`}>
            {pool.name}
          </Link>
          <div className="flex flex-col items-center">
            <div className="flex flex-row">
              <Input
                id="sets"
                label="Sets"
                type="text"
                disabled={isLoading}
                width="w-10"
                value={sets}
                onChange={handleSetsChange}
              />
              <Input
                id="points"
                label="Points"
                type="text"
                disabled={isLoading}
                width="w-10"
                value={points}
                onChange={handlePointsChange}
              />
            </div>
          </div>
        </div>
        <div>
          {/* Delete */}
          {deleting ? (
            <Button type="button" onClick={handleRemoveDeleteID}>
              Cancel Delete
            </Button>
          ) : (
            <Button type="button" danger={true} onClick={handleDeleteID}>
              Delete Pool
            </Button>
          )}
        </div>
      </div>
      <div>
        {/* Teams */}
        {pool.teams.map((team) => {
          const ref = useRef();
          refs.push(ref);
          return (
            <TeamDis
              key={team.id}
              team={team}
              deletingIDs={deletingIDs}
              poolDeleting={deleting}
              addChangingID={addChangingID}
              addDeletingID={addDeletingID}
              removeDeletingID={removeDeletingID}
              ref={ref}
            />
          );
        })}
      </div>
      <div>
        {/* Matches */}
        {pool.matches.map((match) => {
          const ref = useRef();
          refs.push(ref);
          return (
            <MatchDis
              key={match.id}
              match={match}
              deletingIDs={deletingIDs}
              poolDeleting={deleting}
              addChangingID={addChangingID}
              addDeletingID={addDeletingID}
              removeDeletingID={removeDeletingID}
              ref={ref}
            />
          );
        })}
      </div>
      <Button type="button" fullWidth onClick={applyChanges}>
        Apply Changes
      </Button>
      <div className="mt-3">
        <Button type="button" fullWidth onClick={resetValues}>
          Reset Values
        </Button>
      </div>
    </div>
  );
};

export default PoolDis;
