import { Megaphone } from "lucide-react";

export default function Feedbackfooter() {
  return (
    <>
      <div className="w-full mt-8 max-w-md border border-[#EA5D0E1A] bg-[#EA5D0E05] rounded-[8px] px-3 py-4 gap-3 cursor-pointer transition hover:bg-[#fce7e1]">
        <div className="font-medium text-xs">
          <div>
            <Megaphone size={16} />
          </div>
          <div className="mt-[8px] text-xs">
            Thank you for sharing your thoughts! We securely note your user
            credentials so we can better understand and follow up on your
            suggestions to improve your experience.
          </div>
        </div>
      </div>
    </>
  );
}
