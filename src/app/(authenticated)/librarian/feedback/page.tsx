import { Header } from "@/core/presentation/components/Header/Header";
import Feedback from "@/modules/Feedback/presentation/components/Feedback";
import FeedbackTable from "@/modules/Feedback/presentation/components/FeedbackTable";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-20 px-6 md:px-15 lg:px-25 py-10 w-full">
      <Header
        title="Feedback"
        subtitle="Feedback and suggestions sent by the users."
      />
      <Feedback />
    </div>
  );
};

export default page;
