import React from "react";

interface AnnouncementErrorStateProps {
  error?: Error;
}

export const AnnouncementErrorState: React.FC<AnnouncementErrorStateProps> = ({
  error,
}) => {
  return (
    <div className="w-full bg-red-100 border-l-4 border-red-500 h-72 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-600 mb-2">⚠️</div>
        <h3 className="text-lg font-semibold mb-2 text-red-800">
          Unable to load announcements
        </h3>
        <p className="text-red-600">
          {error?.message ||
            "Something went wrong while fetching announcements."}
        </p>
      </div>
    </div>
  );
};
