import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Loader from "../components/Loader";
import axiosCONFIG from "../conf.axios";
import { QuotesType } from "../type/Quotes";
import Quote from "../components/Quote";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["quotes"],
    queryFn: async () => await axiosCONFIG.get("/quotes"),
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

  if (isLoading) return <Loader />;

  return (
    <div className="p-2 mx-auto max-w-screen-xl">
      {data?.data.map((quote: QuotesType) => (
        <Quote quote={quote} mutate={mutate} handleSendLike={handleSendLike} />
      ))}
    </div>
  );
}
