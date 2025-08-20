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
      href: "/books",
      icon: BookOpen,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      name: "Feedback",
      href: "/feedback",
      icon: MessageSquare,
    },
    {
      name: "About",
      href: "/about",
      icon: Info,
    },
  ],

  LIBRARIAN: [
    {
      name: "Dashboard",
      href: "/student/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Books & Genre",
      href: "/books",
      icon: BookOpen,
    },
    {
      name: "Issue / Return",
      href: "/issue-return",
      icon: Repeat,
    },
    {
      name: "Overdues & Fines",
      href: "/overdues-fines",
      icon: AlertTriangle,
    },
    {
      name: "Users",
      href: "/users",
      icon: Users,
    },
    {
      name: "Feedback",
      href: "/feedback",
      icon: MessageSquare,
    },
    {
      name: "Announcements",
      href: "/announcements",
      icon: Megaphone,
    },
  ],
};
