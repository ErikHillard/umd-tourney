import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/inputs/Input";



const PoolDis = ({ pool }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register: registerUpdate,
    handleSubmit: update,
    formState: {
      errors: updateErrors
    }
  } = useForm({
    defaultValues: {
      sets: pool.sets
    }
  });

  const onSubmitUpdate = (data) => {

  }

  const onSubmitDelete = (data) => {

  }

  return (
    <div className="m-6 border rounded p-3 shadow-md flex flex-col">
      <div className="flex flex-row items-center justify-between bg-blue-800">
        {/* Pool Description */}
        <div className="flex flex-col max-w-fit items-center">
          {/* Info */}
          <p className="mr-3 font-bold ">{pool.name}</p>
          <form className="flex flex-col items-center" onSubmit={update(onSubmitUpdate)}>
            <div className="flex flex-row">
              <Input id="sets" label="Sets" type="text" register={registerUpdate} errors={updateErrors} disabled={isLoading} width="w-10"/>
              <Input id="points" label="Points" type="text" register={registerUpdate} errors={updateErrors} disabled={isLoading} width="w-10"/>
            </div>
            <Button type="submit">Apply Changes</Button>
          </form>
        </div>
        <div>
          {/* Delete Apply */}
          <Button type="submit">Delete Pool</Button>
        </div>
      </div>
      <div>
        {/* Teams */}
      </div>
      <div>
        {/* Matches */}
      </div>
      <p>{pool.id}</p>
    </div>
  )
}



export default PoolDis;