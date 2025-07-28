import React from "react";
import FAQList from "@/modules/FAQSection/presentation/components/FAQList";

const page = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12 max-w-7xl mx-auto font-sans">
      <div className="mb-12">
        <h1 className="text-3xl font-semibold mb-2">Welcome to DSS Library!</h1>
        <p className="text-gray-700 mb-8 ">
          Here, students from Class 1 to 12 can easily explore and borrow a wide
          range of books,
          <br />
          from fun stories to helpful textbooks—all in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-20">
          <div>
            <h2 className="font-semibold mb-1">Opening Hours</h2>
            <p className="font-medium mt-3">10:00 am - 4:00 pm</p>
          </div>
          <div className="space-y-xs">
            <h2 className="font-semibold mb-1">Contact Information</h2>
            <p className="font-medium mt-3"> library.sifal@deerwalk.edu.np</p>
            <p className="font-medium">+977-9841259000</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-semibold mb-2 mt-20">FAQ</h1>
        <FAQList />
      </div>
    </div>
  );
};

export default page;
