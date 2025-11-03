import { Megaphone } from "lucide-react";

export default function Feedbackfooter() {
  return (
    <>
      <div className="w-full mt-8 item-text-area rounded-lg px-3 py-4">
        <div className="font-medium text-xs">
          <div>
            <Megaphone size={16} />
          </div>
          <div className="w-full mt-2 text-xs md:text-sm lg:text-base">
            Thank you for sharing your thoughts! We securely note your user
            credentials so we can better understand and follow up on your
            suggestions to improve your experience.
          </div>
        </div>
      </div>
    </>
  );
}
