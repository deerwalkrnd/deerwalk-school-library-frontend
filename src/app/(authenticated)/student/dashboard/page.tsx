import AnnouncementBanner from "@/modules/Student/Dashboard/presentation/components/Announcement/AnnouncementBanner";
import OverviewModal from "@/modules/Student/Dashboard/presentation/components/OverviewModal";
import QuoteModal from "@/modules/Student/Dashboard/presentation/components/QuoteModal";
import RecommendationModal from "@/modules/Student/Dashboard/presentation/components/Recommendation/RecommendationModal";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-5">
      <AnnouncementBanner />
      <div className="flex flex-col gap-5 px-6 md:px-15 lg:px-25">
        <OverviewModal />
        <QuoteModal />
        {/* <BrowseBooks /> */}
        <RecommendationModal />
      </div>
    </div>
  );
};

export default page;
