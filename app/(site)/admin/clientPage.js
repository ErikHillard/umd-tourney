"use client"

// import { addPool, addTeam, resetTourney, setupTestTourney } from "../../../utils/apiUtils"
import { redirect, useRouter } from 'next/navigation'
import axios from "axios"
import { signOut } from 'next-auth/react'
import { useForm } from 'react-hook-form';
import Input from '../../components/inputs/Input';


export default function ClientAdminPage( {createPool, createTeam, confirm, createTestTourney} ) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (data) => {
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
        <label htmlFor="poolID">Pool ID</label>
        <input type="text" name="poolID" className="border-2"></input>
        <button type="submit">Create Team</button>
      </form>

      <form action={confirm} className="flex flex-col border-4">
        <label htmlFor="confirm">Confirm?</label>
        <input type="checkbox" name="confirm"></input>
        <button type="submit">Reset Tournament</button>
      </form>

      <form action={createTestTourney} className="flex flex-col border-4">
        <label htmlFor="confirm">Confirm?</label>
        <input type="checkbox" name="confirm"></input>
        <button type="submit">Create Pool</button>
      </form>

      {/* <form action={createPool} className="flex flex-col border-4">
        <label htmlFor="poolName">Pool Number</label>
        <input type="text" name="poolName" className="border-1"></input>
        <button type="submit">Create Pool</button>
      </form> */}

          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input id="email" label="Email Address" type="email" register={register} errors={errors} disabled={false}/>
            <Input id="password" label="Password" type="password" register={register} errors={errors} disabled={false}/>
          </form>

    <button onClick={() => {
      signOut()
      }}>
      Logout
    </button>
    </div>
  )
}