import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function updateJSON(oldJSON:any, newJSON:any) {
  for (let key in oldJSON) {
      if (newJSON.hasOwnProperty(key)) {
          if (typeof oldJSON[key] === 'object' && typeof newJSON[key] === 'object') {
              updateJSON(oldJSON[key], newJSON[key]);
          } else {
              oldJSON[key] = newJSON[key];
          }
      }
  }
}