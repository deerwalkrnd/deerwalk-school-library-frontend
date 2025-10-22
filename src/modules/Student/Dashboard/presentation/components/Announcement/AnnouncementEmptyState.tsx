import React from "react";

export const AnnouncementEmptyState = () => {
  return (
    <div className="w-full bg-gray-100 h-72 flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 mb-2 text-4xl">📢</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-600">
          No announcements available
        </h3>
        <p className="text-gray-500">
          Check back later for upcoming events and announcements.
        </p>
      </div>
    </div>
  );
};
