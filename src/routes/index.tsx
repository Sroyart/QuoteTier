import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import Loader from "../components/Loader";
import axiosCONFIG from "../conf.axios";
import { QuotesType } from "../type/Quotes";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, isLoading } = useQuery({
    queryKey: ["quotes"],
    queryFn: async () => await axiosCONFIG.get("/quotes"),
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-2 mx-auto max-w-screen-xl">
      {data?.data.map((quote: QuotesType) => (
        <div
          key={quote.id}
          className="w-full text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <Link className="" to={`/quote/${quote.id}`}>
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {quote.content}
            </h5>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="w-full gap-2 sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <AiOutlineLike />
                <span>{quote.likes}</span>
              </a>
              <a
                href="#"
                className="w-full sm:w-auto gap-2 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <AiOutlineDislike />
                <span>{quote.dislikes}</span>
              </a>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
