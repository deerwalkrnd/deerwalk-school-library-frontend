import { useState, useRef, useEffect } from "react";
import { getGenres } from "@/modules/BookPage/application/genreUseCase";

export function useGenreSelection() {
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [genrePage, setGenrePage] = useState(1);
  const genreDropdownRef = useRef<HTMLDivElement>(null);

  const { data: genreData, isLoading } = getGenres({ page: genrePage });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        genreDropdownRef.current &&
        !genreDropdownRef.current.contains(event.target as Node)
      ) {
        setIsGenreDropdownOpen(false);
      }
    };
    if (isGenreDropdownOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isGenreDropdownOpen]);

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId],
    );
  };

  const handleGenrePageChange = (page: number) => {
    setGenrePage(page);
  };

  const resetGenres = () => {
    setSelectedGenres([]);
    setGenrePage(1);
  };

  return {
    isGenreDropdownOpen,
    setIsGenreDropdownOpen,
    selectedGenres,
    setSelectedGenres,
    genrePage,
    setGenrePage,
    genreDropdownRef,
    genreData,
    isLoading,
    toggleGenre,
    handleGenrePageChange,
    resetGenres,
  };
}
