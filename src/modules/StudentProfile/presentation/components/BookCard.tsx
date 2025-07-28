import type React from "react";
import type { BookData } from "../../domain/entities/studentProfileEntity";
import { Button } from "@/core/presentation/components/ui/button";
import { Bookmark, Book } from "lucide-react";
import Image from "next/image";

// Custom Card Components
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardProps) {
  return <div className={`${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`${className}`}>{children}</div>;
}

function CardFooter({ children, className = "" }: CardFooterProps) {
  return <div className={`${className}`}>{children}</div>;
}

interface BookCardProps {
  book: BookData;
  showBorrowButton?: boolean;
}

export function BookCard({ book, showBorrowButton = false }: BookCardProps) {
  return (
    <Card className="w-full max-w-[280px] h-full flex flex-col overflow-hidden relative justify-center">
      {book.isOverdue && (
        <div className="absolute top-4 left-4 bg-[#F10000] text-white text-xs font-bold px-2 py-1 z-10 rounded">
          OVERDUE
        </div>
      )}

      <div className="absolute top-2 right-2 bg-black rounded-full p-1 shadow-lg z-10">
        <Bookmark className="w-4 h-4 text-white" />
      </div>

      <CardContent className="p-0 border shadow-xl bg-white rounded-lg overflow-hidden">
        <div className="aspect-[3/4] relative">
          <Image
            src={
              book.imageUrl ||
              "/placeholder.svg?height=400&width=300&query=book cover"
            }
            alt={book.title}
            fill
            className="object-cover p-8"
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start p-4 gap-3 flex-1">
        <h3 className="text-lg font-semibold line-clamp-2 leading-tight">
          {book.title}
        </h3>
        <p className="text-base text-black font-medium">{book.author}</p>

        {!showBorrowButton && (
          <div className="text-sm text-gray-500 w-full space-y-2">
            <div className="grid grid-cols-2 gap-4 font-semibold text-black">
              <span>Borrowed Date</span>
              <span>Due Date</span>
            </div>
            <div className="grid grid-cols-2 gap-4 font-medium text-gray-700">
              <span>{book.borrowedDate}</span>
              <span>{book.dueDate}</span>
            </div>
          </div>
        )}

        {showBorrowButton && (
          <Button className="w-full bg-primary hover:bg-hover text-white text-sm font-medium py-2 rounded-md flex items-center justify-center gap-2 mt-auto">
            <Book className="w-4 h-4" /> Borrow Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
