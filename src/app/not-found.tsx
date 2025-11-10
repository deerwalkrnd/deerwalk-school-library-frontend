"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "@/core/presentation/components/ui/button";
import { useAuth } from "@/core/presentation/contexts/AuthContext";

export default function NotFound() {
  const router = useRouter();
  const { isAuthenticated, role } = useAuth();

  const primaryDestination = useMemo(() => {
    if (!isAuthenticated) {
      return {
        href: "/login",
        label: "Back to login",
      };
    }

    if (role === "LIBRARIAN") {
      return {
        href: "/librarian/dashboard",
        label: "Go to librarian dashboard",
      };
    }

    return {
      href: "/student/dashboard",
      label: "Go to student dashboard",
    };
  }, [isAuthenticated, role]);

  return (
    <div className="relative flex min-h-screen items-center justify-center ">
      <section className="mx-6 w-full max-w-3xl rounded-3xl border border-border/60 bg-background/90 p-10 shadow-2xl backdrop-blur">
        <div className="flex flex-col items-center gap-10 text-center">
          <div className="space-y-3">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              Lost in the stacks
            </span>
            <h1 className="text-5xl font-semibold md:text-6xl lg:text-7xl">
              404
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              We couldn&rsquo;t find the page you were looking for. It might
              have been shelved in another section of the library.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <Button asChild size="lg">
              <Link href={primaryDestination.href}>
                {primaryDestination.label}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.back()}
              className="border-dashed"
            >
              Go back
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
