export type PageItem = number | "...";

export interface PaginationProps {
  currentPage: number;
  onPageChange: (_page: number) => void;
  totalPages: number;
}
