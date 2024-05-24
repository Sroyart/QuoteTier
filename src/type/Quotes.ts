import { CommentType } from "./CommentType";

export type QuotesType = {
  id: string;
  author: string;
  content: string;
  certified: boolean;
  likes: number;
  dislikes: number;
};

export type QuoteCommentsType = {
  quote: {
    id: string;
    author: string;
    content: string;
    certified: boolean;
    likes: number;
    dislikes: number;
  };
  comments: CommentType[];
};
