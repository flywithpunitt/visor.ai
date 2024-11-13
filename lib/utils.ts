/* eslint-disable prefer-const */
/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "qs";
import { twMerge } from "tailwind-merge";
import { aspectRatioOptions } from "@/constants";

// Add missing interfaces
interface FormUrlQueryParams {
  searchParams: URLSearchParams;
  key: string;
  value: string;
}

interface RemoveUrlQueryParams {
  searchParams: URLSearchParams;
  keysToRemove: string[];
}

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio?: AspectRatioKey;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Rest of your functions remain the same until debounce...

// Fix the debounce function with proper typing
export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: T) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);  // Use spread operator instead of apply
    }, delay);
  };
};

// Fix getImageSize function
export type AspectRatioKey = keyof typeof aspectRatioOptions;
export const getImageSize = (
  type: string,
  image: ImageDimensions,
  dimension: "width" | "height"
): number => {
  if (type === "fill") {
    return (
      aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    );
  }
  return image?.[dimension] || 1000;
};

// Fix deepMergeObjects function
export const deepMergeObjects = <T extends Record<string, unknown>>(
  obj1: T,
  obj2: T | null | undefined
): T => {
  if (obj2 === null || obj2 === undefined) {
    return obj1;
  }

  let output = { ...obj2 } as T;

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === "object" &&
        obj2[key] &&
        typeof obj2[key] === "object"
      ) {
        output[key] = deepMergeObjects(
          obj1[key] as Record<string, unknown>,
          obj2[key] as Record<string, unknown>
        ) as T[Extract<keyof T, string>];
      } else {
        output[key] = obj1[key];
      }
    }
  }

  return output;
};