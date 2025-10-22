import React from "react";

export const AnnouncementLoadingState = () => {
  return (
    <div className="w-full bg-gradient-to-r from-orange-500 to-orange-700 h-72 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
        <p>Loading announcements...</p>
      </div>
    </div>
  );
};
