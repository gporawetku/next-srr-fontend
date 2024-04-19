import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';

export function usePagination(initialRows = 2, initialPage = 1, initialFirst = 0) {
  const [rows, setRows] = useState<number>(initialRows);
  const [page, setPage] = useState<number>(initialPage);
  const [first, setFirst] = useState<number>(initialFirst);

  const onPageChange = (e: PaginatorPageChangeEvent) => {
    setRows(e.rows);
    setPage(e.page + 1);
    setFirst(e.first);
  };

  const data: any = { page, first, rows, onPageChange };
  return { data };
}
