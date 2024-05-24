import { Link } from "@tanstack/react-router";
import React from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { QuotesType } from "../type/Quotes";
import { FaEdit } from "react-icons/fa";
import Modal from "react-modal";
import EditQuote from "./EditQuote";
import { IoMdClose } from "react-icons/io";

type QuoteType = {
  quote: QuotesType;
  mutate: ({ id }: { id: string }) => void;
  handleSendLike: ({
    id,
    likes,
    dislikes,
  }: {
    id: string;
    likes: number;
    dislikes: number;
  }) => void;
  refetch: () => void;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    backgroundColor: "#1F2937",
  },
};

const Quote: React.FC<QuoteType> = ({
  quote,
  mutate,
  handleSendLike,
  refetch,
}) => {
  const [isPressed, setIsPressed] = React.useState({
    like: false,
    dislike: false,
  });

  const handleLike = (type: string) => {
    if (type === "like" && !isPressed.like) {
      setIsPressed({ like: true, dislike: false });
      handleSendLike({
        id: quote.id,
        likes: quote.likes + 1,
        dislikes: quote.dislikes + (isPressed.dislike ? -1 : 0),
      });
    } else if (type === "dislike" && isPressed.like) {
      setIsPressed({ like: false, dislike: true });
      handleSendLike({
        id: quote.id,
        likes: quote.likes + (isPressed.like ? -1 : 0),
        dislikes: quote.dislikes + 1,
      });
    }
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div
      key={quote.id}
      className="w-full m-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div>
        <Link
          to={`/quote/${quote.id}`}
          className="mb-2 text-3xl text-gray-900 dark:text-white"
        >
          {quote.content}
        </Link>

        <div className="items-end justify-between	 space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse ">
          <div>
            <button
              onClick={() => mutate({ id: quote.id })}
              className="w-full mr-2 gap-2 sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <MdDelete color="white" />
            </button>
            <button
              onClick={openModal}
              className="w-full gap-2 sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <FaEdit color="white" />
            </button>
          </div>
          <div>
            <button
              onClick={() => handleLike("like")}
              className="w-full mr-2 gap-2 sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <AiOutlineLike />
              <span>{quote.likes}</span>
            </button>
            <button
              onClick={() => {
                handleLike("dislike");
              }}
              className="w-full sm:w-auto gap-2 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <AiOutlineDislike />
              <span>{quote.dislikes}</span>
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <button onClick={closeModal}>
          <IoMdClose color="white" />
        </button>
        <EditQuote
          quote={quote}
          openModal={openModal}
          refetch={refetch}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};

export default Quote;
