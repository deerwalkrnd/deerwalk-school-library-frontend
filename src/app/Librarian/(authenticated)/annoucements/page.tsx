import React from "react";
import { Calendar28 } from "@/core/presentation/components/ui/Calendar28";
import { Button } from "@/core/presentation/components/ui/button";
import { BooksTable } from "@/modules/Book Page/presentation/components/BooksTable";
import { Plus, Search } from "lucide-react";

const AnnouncementsPage = () => {
  const mockAnnouncements = [
    {
      id: "1",
      recommender: "Aashutosh Pudasaini",
      bookTitle: "Harry Potter and the Sorcerer’s Stone",
      author: "J.K. Rowling",
      publication: "XYZ Publication House",
      addedDate: "20/06/2024",
    },
    {
      id: "2",
      recommender: "Krish Bir Jung Rana",
      bookTitle: "Harry Potter and the Sorcerer’s Stone",
      author: "J.K. Rowling",
      publication: "XYZ Publication House",
      addedDate: "20/06/2024",
    },
    {
      id: "3",
      recommender: "dss_342",
      bookTitle: "Harry Potter and the Sorcerer’s Stone",
      author: "J.K. Rowling",
      publication: "XYZ Publication House",
      addedDate: "20/06/2024",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-8 py-12 mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-1">Announcements</h1>
      <p className="text-gray-600 mb-8">
        Recommend Reads, Highlight New Arrivals & Post Events!
      </p>
      <div className="flex items-center gap-6 mb-6">
        <Button className="bg-orange-100 text-black font-medium px-6 py-2 rounded-md border border-orange-300">
          Teacher’s Recommendation
        </Button>
        <Button variant="ghost" className="text-black font-medium">
          Add Event
        </Button>
        <Button variant="ghost" className="text-black font-medium">
          Add Quote
        </Button>
      </div>

      <hr className="mb-6" />
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search using name..."
            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
          />
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
        </div>
        <div className="flex items-center gap-2">
          <div>
            <p className="text-xs mb-1">Start Date</p>
            <Calendar28 />
          </div>
          <Button className="bg-white border border-gray-300">Apply</Button>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="w-4 h-4 mr-1" />
          Add Recommendation
        </Button>
      </div>
      <div className="overflow-x-auto rounded-md shadow">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-orange-500 text-white text-left">
              <th className="px-4 py-2">S.N.</th>
              <th className="px-4 py-2">Recommender</th>
              <th className="px-4 py-2">Book Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Publication</th>
              <th className="px-4 py-2">Added Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockAnnouncements.map((row, i) => (
              <tr
                key={row.id}
                className={i % 2 === 0 ? "bg-orange-50" : "bg-white"}
              >
                <td className="px-4 py-2">{i + 1}.</td>
                <td className="px-4 py-2">{row.recommender}</td>
                <td className="px-4 py-2">{row.bookTitle}</td>
                <td className="px-4 py-2">{row.author}</td>
                <td className="px-4 py-2">{row.publication}</td>
                <td className="px-4 py-2">{row.addedDate}</td>
                <td className="px-4 py-2">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 rounded">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center gap-2 mt-6 text-sm">
        <button className="px-2 py-1 border rounded">&lt;</button>
        <button className="px-2 py-1 border rounded bg-black text-white">
          1
        </button>
        <button className="px-2 py-1 border rounded">2</button>
        <span>...</span>
        <button className="px-2 py-1 border rounded">5</button>
        <button className="px-2 py-1 border rounded">&gt;</button>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
