/**
 * shadcn/ui is configured (components.json -> aliases.utils) to import `cn`
 * from here, so this path has to exist. Re-export the single implementation in
 * `@/core/lib/utils` rather than keeping a second copy in sync.
 */
export { cn } from "@/core/lib/utils";
