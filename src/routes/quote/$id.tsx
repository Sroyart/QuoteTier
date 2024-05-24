import { createFileRoute } from "@tanstack/react-router";
import axiosCONFIG from "../../conf.axios";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import CommentForm from "../../components/CommentForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { CommentType } from "../../type/CommentType";
import { MdDelete } from "react-icons/md";

export const Route = createFileRoute("/quote/$id")({
  component: Quotes,
});

function Quotes() {
  const postId = Route.useParams();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["quote"],
    queryFn: async () => await axiosCONFIG.get(`/quote/${postId.id}`),
  });

  const { mutate } = useMutation({
    mutationFn: async (deleteComment: { id: string }) => {
      return await axiosCONFIG
        .delete(`/comment/${deleteComment.id}`)
        .then(() => refetch());
    },
  });

  if (isLoading) <Loader />;

  return (
    <div className="mx-auto max-w-screen-xl block mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      {data?.data.quote.certified && (
        <p className="text-gray-300 text-end">(Certified)</p>
      )}
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data?.data.quote.content}
      </h5>
      <div className="items-end justify-end space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
        <div className="w-full gap-2 sm:w-auto bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
          <AiOutlineLike />
          <span>{data?.data.quote.likes}</span>
        </div>
        <div className="w-full sm:w-auto gap-2 bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
          <AiOutlineDislike />
          <span>{data?.data.quote.dislikes}</span>
        </div>
      </div>
      <CommentForm quotes_id={data?.data.quote.id} refetch={refetch} />
      {data?.data.comments.map((comment: CommentType) => (
        <div
          key={comment.id}
          className="mt-4 p-4 bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <h6 className="text-lg font-semibold text-gray-900 dark:text-white">
            {comment.author}
          </h6>
          <p className="text-gray-900 dark:text-white">{comment.content}</p>
          <div className="text-right">
            <button
              onClick={() => mutate({ id: comment.id })}
              className="w-full mr-2 gap-2 sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <MdDelete color="white" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
