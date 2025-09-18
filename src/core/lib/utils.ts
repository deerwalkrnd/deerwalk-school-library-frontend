import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getHeader = (request: Request) => {
  if (request.headers.get("authorization")) {
    return request.headers.get("authorization");
  } else {
    throw new Error("User token not found");
  }
};
