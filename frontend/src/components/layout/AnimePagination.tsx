import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  pagination: any;
  page: number;
  setPage: (p: number) => void;
}

const AnimePagination = ({ pagination, page, setPage }: Props) => {
  if (!pagination) return null;
  const totalPages = pagination.last_visible_page;
  const maxVisible = 5; // máximo botones visibles
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + maxVisible - 1);

  return (
    <Pagination className="flex justify-center py-6">
      <PaginationContent className="flex gap-2">
        {/* Botón anterior */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => page > 1 && setPage(page - 1)}
            className="px-3 py-2 rounded-md bg-zinc-900 border border-white/10 text-gray-300 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-colors duration-300"
          />
        </PaginationItem>

        {/* Números dinámicos */}
        {Array.from({ length: end - start + 1 }, (_, i) => {
          const pageNumber = start + i;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // evita reload
                  setPage(pageNumber);
                }}
                isActive={page === pageNumber}
                className={`px-3 py-2 rounded-md border border-white/10 transition-colors duration-300 ${
                  page === pageNumber
                    ? "bg-purple-600 text-white font-bold border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    : "bg-zinc-900 text-gray-300 hover:text-white hover:bg-purple-600/80 hover:border-purple-500/80"
                }`}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Botón siguiente */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pagination.has_next_page) setPage(page + 1);
            }}
            className="px-3 py-2 rounded-md bg-zinc-900 border border-white/10 text-gray-300 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-colors duration-300"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AnimePagination;
