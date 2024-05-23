import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosCONFIG from "../conf.axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Route = createFileRoute("/NewQuotes")({
  component: NewQuotes,
});

type Inputs = {
  author: string;
  content: string;
};

function NewQuotes() {
  const notify = () => toast.success("Quote added!");
  const { mutate } = useMutation({
    mutationFn: async (newQuote: Inputs) => {
      return await axiosCONFIG.post("/quote", newQuote);
    },
  });
  const { register, handleSubmit, reset, formState } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      notify();
    }
  }, [formState, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 mx-auto block max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Author
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          placeholder="Author"
          {...register("author")}
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Quote
        </label>
        <textarea
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your quote..."
          {...register("content", { required: true })}
        ></textarea>
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
}
