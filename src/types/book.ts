export enum MemoSortType {
  LATEST = '최신순',
  OLDEST = '오래된순',
  PAGE_ASC = '페이지순',
  PAGE_DESC = '페이지역순',
}

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
