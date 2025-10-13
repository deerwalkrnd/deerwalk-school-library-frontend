"use client";
import { Button } from "@/core/presentation/components/ui/button";
import { AddBookModal } from "@/modules/BookModals/presentation/components/AddBook";
import { AddGenreModal } from "@/modules/BookModals/presentation/components/AddGenre";
import { DeleteBookModal } from "@/modules/BookModals/presentation/components/DeleteBook";
import { EditBookModal } from "@/modules/BookModals/presentation/components/EditBook";
import { ImportBooksModal } from "@/modules/BookModals/presentation/components/ImportBooks";
import { EditFineModal } from "@/modules/Overdues/presentation/components/EditFine";
import { useState } from "react";

export default function Home() {
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [deleteBookOpen, setDeleteBookOpen] = useState(false);
  const [addGenreOpen, setAddGenreOpen] = useState(false);
  const [importBooksOpen, setImportBooksOpen] = useState(false);
  const [editBookOpen, setEditBookOpen] = useState(false);
  const [fineAmountOpen, setFineAmountOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Book Management Modals</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Button
            onClick={() => setAddBookOpen(true)}
            className="bg-green-500 hover:bg-green-600"
          >
            Add Book
          </Button>
          <Button
            onClick={() => setDeleteBookOpen(true)}
            className="bg-[#FB3C3C] hover:bg-red-600"
          >
            Delete Book
          </Button>
          <Button
            onClick={() => setAddGenreOpen(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Add Genre
          </Button>
          <Button
            onClick={() => setImportBooksOpen(true)}
            className="bg-purple-500 hover:bg-purple-600"
          >
            Import Books
          </Button>
          <Button
            onClick={() => setEditBookOpen(true)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Edit Book
          </Button>
          <Button
            onClick={() => setFineAmountOpen(true)}
            className="bg-amber-500"
          >
            Add Fine
          </Button>
        </div>

        <AddBookModal open={addBookOpen} onOpenChange={setAddBookOpen} />
        <DeleteBookModal
          open={deleteBookOpen}
          onOpenChange={setDeleteBookOpen}
        />
        <AddGenreModal open={addGenreOpen} onOpenChange={setAddGenreOpen} />
        <ImportBooksModal
          open={importBooksOpen}
          onOpenChange={setImportBooksOpen}
        />
        <EditBookModal open={editBookOpen} onOpenChange={setEditBookOpen} />
        <EditFineModal open={fineAmountOpen} onOpenChange={setFineAmountOpen} />
      </div>
    </div>
  );
}
