"use client";
import { getEvents } from "@/modules/Announcement/Events/application/eventUseCase";
import React from "react";
import { AnnouncementLoadingState } from "./AnnouncementLoadingState";
import { AnnouncementErrorState } from "./AnnouncementErrorState";
import { AnnouncementEmptyState } from "./AnnouncementEmptyState";
import { AnnouncementSlider } from "./AnnouncementSlider";

const AnnouncementBanner = () => {
  const { data, isLoading, isError, error } = getEvents();
  console.log(data);

  if (isLoading) {
    return <AnnouncementLoadingState />;
  }

  if (isError) {
    return <AnnouncementErrorState error={error} />;
  }

  // Show empty state
  if (!data || !data.items || data.items.length === 0) {
    return <AnnouncementEmptyState />;
  }

  return <AnnouncementSlider events={data.items} />;
};

export default AnnouncementBanner;
