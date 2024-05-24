import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Loader from "../components/Loader";
import axiosCONFIG from "../conf.axios";
import { QuotesType } from "../type/Quotes";
import Quote from "../components/Quote";
import { useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [paramsQuotes, setParamsQuotes] = useState({ sort: "likes" });
  const { data, isLoading, refetch } = useQuery({
    queryKey: [paramsQuotes.sort],
    queryFn: async () =>
      await axiosCONFIG.get("/quotes", { params: paramsQuotes }),
  });

  const { mutate } = useMutation({
    mutationFn: async (newQuote: { id: string }) => {
      return await axiosCONFIG
        .delete(`/quote/${newQuote.id}`)
        .then(() => refetch());
    },
  });

  const { mutate: handleSendLike } = useMutation({
    mutationFn: async (newQuote: {
      id: string;
      likes: number;
      dislikes: number;
    }) => {
      return await axiosCONFIG
        .put(`/quote/like/${newQuote.id}`, newQuote)
        .then(() => refetch());
    },
  });

  const handleSort = () => {
    if (paramsQuotes.sort === "likes") {
      setParamsQuotes({ sort: "dislikes" });
    } else {
      setParamsQuotes({ sort: "likes" });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-2 mx-auto max-w-screen-xl">
      <div className="text-right">
        <button
          onClick={() => handleSort()}
          className="w-full mr-2 mt-6 gap-2 sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
        >
          {paramsQuotes.sort === "likes" ? (
            <FaSortAmountDown />
          ) : (
            <FaSortAmountDownAlt />
          )}
        </button>
      </div>
      {data?.data.map((quote: QuotesType) => (
        <Quote
          key={quote.id}
          quote={quote}
          mutate={mutate}
          handleSendLike={handleSendLike}
          refetch={refetch}
        />
      ))}
    </div>
  );
}
