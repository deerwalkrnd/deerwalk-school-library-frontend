import React from "react";
import Feedbackfooter from "@/modules/FeedbackSection/Feedbackfooter";
import Feedbackform from "@/modules/FeedbackSection/Feedbackform";

const page = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12 max-w-7xl mx-auto font-sans">
      <div className="mb-12">
        <h1 className="text-2xl font-semibold mb-2">Feedback & Suggestions</h1>
        <p className="text-gray-600 mb-8 mt-7 text-base ">
          Help us improve your library experience.
        </p>
      </div>

      <div>
        <Feedbackform />
      </div>
      <div>
        <Feedbackfooter />
      </div>
    </div>
  );
};

export default page;
