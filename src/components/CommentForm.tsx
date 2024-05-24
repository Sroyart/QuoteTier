import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axiosCONFIG from "../conf.axios";

type Inputs = {
  author: string;
  content: string;
  quotes_id: string; // Add the 'quoteId' property to the 'Inputs' type definition
};

const CommentForm: React.FC<{ quotes_id: string; refetch: () => void }> = ({
  quotes_id,
  refetch,
}) => {
  const notify = () => toast.success("Comment added!");
  const { mutate } = useMutation({
    mutationFn: async (newComment: Inputs) => {
      return await axiosCONFIG.post("/comment", newComment);
    },
  });

  const { register, handleSubmit, reset, formState } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({ ...data, quotes_id: quotes_id });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      refetch();
      notify();
    }
  }, [formState, refetch, reset]);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-4">
        <div className="flex-1 items-center relative z-0 max-w-sm mb-5 group">
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("author", { required: true })}
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Pseudo
          </label>
        </div>
        <div className="flex-1 relative z-0 mb-5 group">
          <input
            {...register("content", { required: true })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Comment
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      <ToastContainer />
    </form>
  );
};

export default CommentForm;
