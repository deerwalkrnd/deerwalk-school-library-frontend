import { useRef, useEffect } from "react";

interface GenreData {
  items?: any[];
  hasNextPage?: boolean;
}

interface BookGenreSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedGenres: number[];
  onGenreToggle: (genreId: number) => void;
  genreData?: GenreData;
  isLoading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function BookGenreSelector({
  isOpen,
  onToggle,
  selectedGenres,
  onGenreToggle,
  genreData,
  isLoading,
  currentPage,
  onPageChange,
}: BookGenreSelectorProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-black">Genre</label>

      <div
        onClick={onToggle}
        className="w-45 px-3 py-2 border border-gray-300 rounded-sm text-sm font-medium bg-primary/5 cursor-pointer"
      >
        {selectedGenres.length > 0
          ? `${selectedGenres.length} selected`
          : "Select genres"}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-45 mt-1 bg-white border border-gray-300 rounded-sm shadow-lg max-h-60 overflow-y-auto">
          {isLoading && (
            <div className="px-3 py-2 text-xs text-gray-600">Loading…</div>
          )}

          {!isLoading &&
            genreData?.items?.map((genre) => (
              <div
                key={genre.id}
                onClick={() => onGenreToggle(genre.id)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={selectedGenres.includes(genre.id)}
                  className="h-4 w-4 accent-black"
                />
                <span className="text-sm text-black">{genre.title}</span>
              </div>
            ))}

          {/* Footer: Prev / Next */}
          <div className="flex justify-between items-center px-3 py-2 border-t border-gray-200">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPageChange(Math.max(1, currentPage - 1));
              }}
              disabled={currentPage === 1}
              className="text-xs font-medium text-black disabled:text-gray-400"
            >
              Previous
            </button>
            <span className="text-xs text-gray-600">Page {currentPage}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPageChange(currentPage + 1);
              }}
              disabled={!genreData?.hasNextPage}
              className="text-xs font-medium text-black disabled:text-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
