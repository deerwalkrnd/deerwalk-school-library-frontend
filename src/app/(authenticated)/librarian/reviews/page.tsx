// import React from "react";
// import { CircleX, MoreVertical, MessageCircleWarning } from "lucide-react";
// import { Icon } from "@iconify/react";

// const ReviewsPage = () => {
//   return (
//     <div className="min-h-screen bg-white px-6 py-12 max-w-7xl mx-auto font-sans">
//       <div className="mb-6 flex items-start justify-between">
//         <div className="flex-1"></div>
//         <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-center flex-1">
//           View Reviews
//         </h1>
//         <div className="flex-1 flex justify-end">
//           <CircleX className="w-6 h-6" />
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm md:text-base mt-10">
//         <div className="space-y-4">
//           <p className="text-gray-500">Book Title</p>
//           <p className="font-medium">Harry Potter and the Sorcerer’s Stone</p>
//         </div>
//         <div className="space-y-4">
//           <p className="text-gray-500">ISBN</p>
//           <p className="font-medium">2784252521904</p>
//         </div>
//         <div className="space-y-5">
//           <p className="text-gray-500">Publication</p>
//           <p className="font-medium">Bloomsburry</p>
//         </div>
//       </div>
//       <hr className="my-10 border-gray-200" />

//       <div className="mb-4">
//         <h2 className="text-lg font-semibold">Reviews for this book</h2>
//         <div className="flex items-center gap-4 mt-5">
//           <span className="px-1 rounded text-sm"> 8 Reviews</span>
//           <div className="flex items-center gap-1 text-sm cursor-pointer hover:text-black">
//             <Icon icon="mi:filter" className="w-4 h-4" />
//             Sort by
//           </div>
//           <button className="ml-auto flex items-center gap-1 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded">
//             <MessageCircleWarning className="w-3 h-3" />
//             View Spam
//           </button>
//         </div>
//       </div>
//       <div className="space-y-6 mt-10">
//         <div className="flex gap-3">
//           <img
//             src="https://randomuser.me/api/portraits/women/44.jpg"
//             alt="Krish"
//             className="w-10 h-10 rounded-full"
//           />
//           <div className="flex-1 border-b border-gray-200 pb-4">
//             <div className="flex justify-between items-start">
//               <p className="text-sm font-medium">@Krish Devkota</p>
//               <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer" />
//             </div>
//             <p className="text-sm text-gray-700 mt-1">
//               Lorem ipsum dolor sit amet consectetur. In morbi consequat
//               curabitur maecenas consequat commodo amet neque leo. A feugiat
//               tristique dui blandit. Enim volutpat vitae suspendisse in id in.
//               Fermentum velit maecenas sed ornare proin vel neque sem.
//             </p>
//           </div>
//         </div>
//         <div className="flex gap-3">
//           <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
//             JD
//           </div>
//           <div className="flex-1 border-b border-gray-200 pb-4">
//             <div className="flex justify-between items-start">
//               <p className="text-sm font-medium">@Rahul Shah</p>
//               <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer" />
//             </div>
//             <p className="text-sm text-gray-700 mt-1">
//               Lorem ipsum dolor sit amet consectetur. In morbi consequat
//               curabitur maecenas consequat commodo amet neque leo. A feugiat
//               tristique dui blandit. Enim volutpat vitae suspendisse in id in.
//               Fermentum velit maecenas sed ornare proin vel neque sem.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewsPage;

import React from "react";
import { CircleX, MessageCircleWarning } from "lucide-react";
import { Icon } from "@iconify/react";
import ReviewList from "@/modules/Reviews/presentation/components/ReviewsList";

const page = () => {
  return (
    <div className="min-h screen bg-white px-6 py-12 max-w-7xl mx-auto font-sans">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex-1"></div>
        <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-center flex-1 ">
          View Reviews
        </h1>
        <div className="flex-1 flex justify-end">
          <CircleX className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm md:text-base mt-10">
        <div className="space-y-4">
          <p className="text-gray-500">Book Ttile</p>
          <p className="font-medium">Harry Potter and the Sorcerer's Stone</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-500">ISBN</p>
          <p className="font-medium">988976655446</p>
        </div>
        <div className="space-y-5">
          <p className="text-gray-500">Publication</p>
          <p className="font-medium">Bloomsburry</p>
        </div>
      </div>

      <hr className="my-10 border-gray-200" />

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Reviews for this book</h2>
        <div className="flex items-center gap-4 mt-5">
          <span className="px-1 rounded text-sm"> 8 Reviews</span>
          <div className="flex items-center gap-1 text-sm cursor-pointer hover:text-black">
            <Icon icon="mi:filter" className="w-4 h-4" />
            Sort by
          </div>
          <button className="ml-auto flex items-center gap-1 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded">
            <MessageCircleWarning className="w-3 h-3" />
            View Spam
          </button>
        </div>
      </div>

      <ReviewList />
    </div>
  );
};

export default page;
