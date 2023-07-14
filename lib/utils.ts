import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseHTML(htmlString: string) {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(htmlString, 'text/html');
  const bodyElement = parsedDocument.body;

  return bodyElement;
}