import { addTeam } from "../../utils/apiUtils"
import { redirect } from 'next/navigation'


export default function AdminPage( {} ) {
  async function createPool(data) {
    "use server"

    console.log(data.get("poolName"))
  }
  async function createTeam(data) {
    "use server"

    // need to check for uniqueness here

    addTeam(data.get("teamName"), data.get("poolNumber"));

    redirect(`/teams/${data.get("teamName")}`);
  }

  async function confirm(data) {
    "use server"

    if (data.get("confirm")) {
      // Reset Tourney
    }
  }

  return (
    <div className="flex flex-col">
      <form action={createPool} className="flex flex-col border-4">
        <label htmlFor="poolNumber">Pool Number</label>
        <input type="text" name="poolNumber" className="border-2"></input>
        <button type="submit">Create Pool</button>
      </form>

      <form action={createTeam} className="flex flex-col border-4">
        <label htmlFor="teamName">Team Name</label>
        <input type="text" name="teamName" className="border-2"></input>
        <label htmlFor="poolNumber">Pool Number</label>
        <input type="text" name="poolNumber" className="border-2"></input>
        <button type="submit">Create Team</button>
      </form>

      <form action={confirm} className="flex flex-col border-4">
        <label htmlFor="confirm">Confirm?</label>
        <input type="checkbox" name="confirm"></input>
        <button type="submit">Reset Tournament</button>
      </form>

      {/* <form action={createPool} className="flex flex-col border-4">
        <label htmlFor="poolName">Pool Number</label>
        <input type="text" name="poolName" className="border-1"></input>
        <button type="submit">Create Pool</button>
      </form>

      <form action={createPool} className="flex flex-col border-4">
        <label htmlFor="poolName">Pool Number</label>
        <input type="text" name="poolName" className="border-1"></input>
        <button type="submit">Create Pool</button>
      </form> */}
    </div>
  )
}