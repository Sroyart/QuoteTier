import React from "react";
import { QuotesType } from "../type/Quotes";
import axiosCONFIG from "../conf.axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type Props = {
  quote: QuotesType;
  openModal: () => void;
  refetch: () => void;
  closeModal: () => void;
};

type Inputs = {
  id: string;
  author: string;
  content: string;
  certified: boolean;
};

const EditQuote: React.FC<Props> = ({ quote, refetch, closeModal }) => {
  const { mutate } = useMutation({
    mutationFn: async (newQuote: Inputs) => {
      return await axiosCONFIG.put(`/quote/${quote.id}`, newQuote).then(() => {
        refetch();
        closeModal();
      });
    },
  });
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
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
          defaultValue={quote.author}
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
          defaultValue={quote.content}
          {...register("content", { required: true })}
        ></textarea>
      </div>
      <div className="flex items-center mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          defaultChecked={quote.certified}
          {...register("certified")}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Default checkbox
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default EditQuote;
