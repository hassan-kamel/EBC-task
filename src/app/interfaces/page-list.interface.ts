export interface PageList<T> {
  results: number;
  data: T[];
  paginationResults: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
    next: number;
  };
}
