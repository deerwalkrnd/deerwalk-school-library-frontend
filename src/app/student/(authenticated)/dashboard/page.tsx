import DashboardHero from "@/core/presentation/assets/images/DashboardHero";
import AnnouncementBanner from "@/modules/Student/Dashboard/presentation/components/AnnouncementBanner";
import OverviewModal from "@/modules/Student/Dashboard/presentation/components/OverviewModal";
import QuoteModal from "@/modules/Student/Dashboard/presentation/components/QuoteModal";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-5">
      <AnnouncementBanner />
      <OverviewModal />
      <QuoteModal />
    </div>
  );
};

export default page;
