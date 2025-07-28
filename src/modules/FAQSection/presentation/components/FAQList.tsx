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

  const half = Math.ceil(faqList.length / 2);
  const leftFaqs = faqList.slice(0, half);
  const rightFaqs = faqList.slice(half);

  return (
    <div className="w-full mt-7">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto ml-0 pl-0 border-l-0">
        <div className="flex flex-col gap-8 w-full">
          {leftFaqs.map((faq, index) => (
            <FAQComponent key={index} faq={faq} />
          ))}
        </div>
        <div className="flex flex-col gap-8 w-full">
          {rightFaqs.map((faq, index) => (
            <FAQComponent key={index + half} faq={faq} />
          ))}
        </div>
      </div>
    </div>
  );
}
