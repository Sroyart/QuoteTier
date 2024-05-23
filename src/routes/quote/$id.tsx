import { createFileRoute } from "@tanstack/react-router";
import axiosCONFIG from "../../conf.axios";
import { QuoteCommentsType } from "../../type/Quotes";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

async function getPokemon(id: string) {
  const { data } = await axiosCONFIG.get(`/quote/${id}`);
  return data;
}

export const Route = createFileRoute("/quote/$id")({
  component: Quotes,
  loader: ({ params }) => getPokemon(params.id),
});

function Quotes() {
  const { quote, comments }: QuoteCommentsType = Route.useLoaderData();
  console.log(quote);

  return (
    <div className="mx-auto max-w-screen-xl block mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {quote.content}
      </h5>
      <div className="items-end justify-end space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
        <div className="w-full gap-2 sm:w-auto bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
          <AiOutlineLike />
          <span>{quote.likes}</span>
        </div>
        <div className="w-full sm:w-auto gap-2 bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
          <AiOutlineDislike />
          <span>{quote.dislikes}</span>
        </div>
      </div>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="mt-4 p-4 bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <h6 className="text-lg font-semibold text-gray-900 dark:text-white">
            {comment.author}
          </h6>
          <p className="text-gray-900 dark:text-white">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
