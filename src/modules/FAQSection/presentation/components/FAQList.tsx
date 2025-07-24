"use client";

import FAQComponent from "./FAQComponent";
import { FAQEntity } from "@/modules/FAQSection/domain/entities/FAQEntity";

export default function FAQList() {
  const faqList: FAQEntity[] = [
    {
      question: "How do I borrow a book?",
      answer: [
        "Log in, search for a book, and request to borrow if the books is available. You can pick up the book from the library within the next 24 hours.",
      ],
    },
    {
      question: "How long can I keep a book?",
      answer: [
        "It will be set by the librarian. Check your dashboard for the due date.",
      ],
    },
    {
      question: "Can I renew a book online?",
      answer: [
        "To renew a book, you must visit the library. You have a set amount of renews before you have to re-borrow the book.",
      ],
    },
    {
      question: "What if I return a book late?",
      answer: ["A late fee may apply as per library policy."],
    },
    {
      question: "How do I search for books?",
      answer: [
        "Use the search bar to find the books by title, author or any other related fields.",
      ],
    },
    {
      question: "Can I edit my profile?",
      answer: [
        "Your profile data will be based on you google account's data or the credentials you use to login to the system.",
      ],
    },
    {
      question: "How is my data protected?",
      answer: ["The system uses secure logins and role-based access control."],
    },
    {
      question: "Forgot your password?",
      answer: [
        'For students not using their google account to login, click "Forgot Password" or ask the librarian for help.',
      ],
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-48 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
        {faqList.map((faq, index) => (
          <div key={index} className="flex justify-center lg:justify-start">
            <FAQComponent key={index} faq={faq} />
          </div>
        ))}
      </div>
    </div>
  );
}
