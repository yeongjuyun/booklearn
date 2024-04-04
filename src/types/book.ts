export type BookMemo = {
  id: string;
  page: number;
  content: string;
  createdAt: string;
};

export type BookEssay = {
  id: string;
  content: string;
  createdAt: string;
};

export type Book = {
  id: string;
  isbn: string;
  title: string;
  cover: string;
  author: string;
  publisher: string;
  memoList: Array<BookMemo>;
  essay: BookEssay;
};
