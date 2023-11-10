"use client";

// import { addPool, addTeam, resetTourney, setupTestTourney } from "../../../utils/apiUtils"
import { notFound, redirect, useRouter } from "next/navigation";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getAllPools from "@/get/client/getAllPools";
import PoolDis from "./PoolDis";

export default function ClientAdminPage({}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: pools,
    isError,
    isInitialLoading,
    isLoading: poolsLoading,
  } = useQuery({
    queryKey: [`pools`],
    queryFn: async () => {
      const { data } = await getAllPools();
      return data;
    },
  });

  // TODO make this so that all isErrors will run the same things
  if (isError) {
    toast.error("We couldn't pull the pools right now sorry!");
    notFound();
  }

  const { register: registerReset, handleSubmit: handleSubmitReset } = useForm({
    defaultValues: {
      check: false,
    },
  });

  const onSubmitReset = (data) => {
    if (!data?.check) {
      return;
    }
    setIsLoading(true);
    axios
      .delete("/api/pools", null)
      .then(() => toast.success("Finished Resetting Tourney"))
      .then(() => queryClient.invalidateQueries(["pools"]))
      .finally(() => setIsLoading(false));
  };

  const {
    register: registerCreateTestTourney,
    handleSubmit: handleSubmitCreateTestTourney,
    formState: { errors: errorsCreateTestTourney },
  } = useForm({
    defaultValues: {
      check: false,
    },
  });

  const onSubmitCreateTestTourney = (data) => {
    if (!data?.check) {
      return;
    }
    setIsLoading(true);
    axios
      .delete("/api/pools", null)
      .then(() => axios.post("/api/tournament"))
      .then(() => toast.success("Finished Creating test tourney"))
      .then(() => queryClient.invalidateQueries(["pools"]))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col">
      {poolsLoading ? (
        <></>
      ) : (
        pools?.map((pool) => <PoolDis pool={pool} key={pool.id} />)
      )}
      <form className="m-4" onSubmit={handleSubmitReset(onSubmitReset)}>
        <Input
          id="check"
          label="Are you sure you want to reset the tournament"
          type="checkbox"
          register={registerReset}
          disabled={isLoading}
        />
        <Button fullWidth type="submit" disabled={isLoading}>
          Reset
        </Button>
      </form>

      <form
        className="m-4"
        onSubmit={handleSubmitCreateTestTourney(onSubmitCreateTestTourney)}
      >
        <Input
          id="check"
          label="Are you sure you want to create test tourney"
          type="checkbox"
          register={registerCreateTestTourney}
          errors={errorsCreateTestTourney}
          disabled={isLoading}
        />
        <Button disabled={isLoading} fullWidth type="submit">
          Create Test Tourney
        </Button>
      </form>

      <button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </div>
  );
}
