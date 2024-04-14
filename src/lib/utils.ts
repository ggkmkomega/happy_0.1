import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function darkenedBgImage(url: string) {
  return `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) ), url('${url}')`
}
