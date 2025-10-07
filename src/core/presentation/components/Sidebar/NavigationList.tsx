import {
  Home,
  BookOpen,
  User,
  MessageSquare,
  Info,
  LayoutDashboard,
  Repeat,
  AlertTriangle,
  Users,
  Megaphone,
} from "lucide-react";

export const NavigationConfig = {
  STUDENT: [
    {
      name: "Home",
      href: "/student/dashboard",
      icon: Home,
    },
    {
      name: "Books",
      href: "/student/allbooks",
      icon: BookOpen,
    },
    {
      name: "Profile",
      href: "/student/studentprofile",
      icon: User,
    },
    {
      name: "Feedback",
      href: "/student/feedback",
      icon: MessageSquare,
    },
    // {
    //   name: "About",
    //   href: "/student/about",
    //   icon: Info,
    // },
  ],

  LIBRARIAN: [
    {
      name: "Dashboard",
      href: "/librarian/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Books & Genre",
      href: "/librarian/books",
      icon: BookOpen,
    },
    {
      name: "Issue / Return",
      href: "/librarian/bookStatus",
      icon: Repeat,
    },
    {
      name: "Overdues & Fines",
      href: "/overdues-fines",
      icon: AlertTriangle,
    },
    {
      name: "Users",
      href: "/librarian/users",
      icon: Users,
    },
    {
      name: "Feedback",
      href: "/librarian/feedback",
      icon: MessageSquare,
    },
    {
      name: "Announcements",
      href: "/librarian/announcements",
      icon: Megaphone,
    },
  ],
};
