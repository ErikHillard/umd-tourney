import clsx from "clsx";
import React, { useImperativeHandle, useMemo, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/inputs/Input";

const TeamDis = React.forwardRef(({
  team,
  deletingIDs,
  poolDeleting,
  addChangingID,
  addDeletingID,
  removeDeletingID,
}, ref) => {
  const [name, setName] = useState(team.name);

  const deleting = useMemo(
    () => poolDeleting || team.id in deletingIDs
    , [poolDeleting, deletingIDs]);

  const handleNameChange = (event) => {
    addChangingID(team.id, ["team", event.target.value]);
    setName(event.target.value)
  };

  const handleRemoveDeleteID = (event) => {
    removeDeletingID(team.id);
  };
  const handleDeleteID = (event) => {
    addDeletingID(team.id, 'team');
  };

  const reset = () => {
    setName(team.name);
  }

  useImperativeHandle(ref, () => ({
    reset,
  }))
  

  return (
    <div className={clsx(
      "m-3 border rounded p-3 shadow-md flex flex-row justify-between items-center",
      deleting && "opacity-50",
      deleting && "bg-red-300"
    )}>
      <Input
        id="name"
        label="Team Name:"
        type="text"
        value={name}
        onChange={handleNameChange}
      />
      {deleting ? (
        <Button type="button" onClick={handleRemoveDeleteID}>
          Cancel Delete
        </Button>
      ) : (
        <Button type="button" danger={true} onClick={handleDeleteID}>
          Delete Team
        </Button>
      )}
    </div>
  );
});

export default TeamDis;
