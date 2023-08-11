"use client"

// import { addPool, addTeam, resetTourney, setupTestTourney } from "../../../utils/apiUtils"
import { redirect, useRouter } from 'next/navigation'
import axios from "axios"
import { signOut } from 'next-auth/react'
import { useForm } from 'react-hook-form';
import Input from '../../components/inputs/Input';
import Button from '../../components/Button';
import { useState } from 'react';
import { toast } from 'react-hot-toast';


export default function ClientAdminPage({  }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset
  } = useForm({
    defaultValues: {
      check: false,
    }
  });

  const onSubmitReset = (data) => {
    if (!data?.check) {
      return
    }
    setIsLoading(true)
    axios.delete('/api/pools', null)
      .then(() =>
        toast.success('Finished Resetting Tourney'))
      .finally(() =>
        setIsLoading(false));
  }

  const {
    register: registerCreateTestTourney,
    handleSubmit: handleSubmitCreateTestTourney,
    formState: {
      errors: errorsCreateTestTourney
    }
  } = useForm({
    defaultValues: {
      check: false,
    }
  });

  const onSubmitCreateTestTourney = (data) => {
    if (!data?.check) {
      return
    }
    setIsLoading(true);
    axios.delete('/api/pools', null)
      .then(() => (
        axios.post('/api/tournament')))
      .then((result) =>
        console.log(result))
      .then(() =>
        toast.success("Finished Creating test tourney"))
      .finally(() => setIsLoading(false))
    
  }

  return (
    <div className="flex flex-col">
      <form
        className="m-4"
        onSubmit={handleSubmitReset(onSubmitReset)}
      >
        <Input id="check" label="Are you sure you want to reset the tournament" type="checkbox" register={registerReset} disabled={isLoading} />
        <Button fullWidth type="submit" disabled={isLoading}>Reset</Button>
      </form>

      <form
        className="m-4"
        onSubmit={handleSubmitCreateTestTourney(onSubmitCreateTestTourney)}
      >
        <Input id="check" label="Are you sure you want to create test tourney" type="checkbox" register={registerCreateTestTourney} errors={errorsCreateTestTourney} disabled={isLoading} />
        <Button disabled={isLoading} fullWidth type="submit">Create Test Tourney</Button>
      </form>

      <button onClick={() => {
        signOut()
      }}>
        Logout
      </button>
    </div>
  )
}