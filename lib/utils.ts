import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseHTML(htmlString: string) {
  const trimmedString = trimHTML(htmlString)
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(trimmedString, 'text/html');
  const bodyElement = parsedDocument.body;

  return bodyElement;
}

function trimHTML(htmlString: string): string {
  const trimmedString = htmlString.replace(/<[^>]*>(\s|&nbsp;)*<\/[^>]*>/gi, '');
  return trimmedString;
}
