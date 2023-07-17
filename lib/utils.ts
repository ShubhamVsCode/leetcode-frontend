"use client"

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import parse from 'html-react-parser';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseHTML(htmlString: string) {
  const trimmedString = trimHTML(htmlString)
  return parse(trimmedString);
}

function trimHTML(htmlString: string): string {
  const trimmedString = htmlString.replace(/<[^>]*>(\s|&nbsp;)*<\/[^>]*>/gi, '');
  return trimmedString;
}
