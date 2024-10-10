import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//更新robot的数据
export function updateRobotJSON (oldJSON: any, newJSON: any) {
  for (let key in oldJSON) {
    if (newJSON.hasOwnProperty(key)) {
      if (
        typeof oldJSON[key] === 'object' &&
        typeof newJSON[key] === 'object'
      ) {
        updateRobotJSON(oldJSON[key], newJSON[key])
      } else if (typeof oldJSON[key] === 'string') {
        //如果新的value，非string
        oldJSON[key] =
          typeof newJSON[key] !== 'string'
            ? JSON.stringify(newJSON[key])
            : newJSON[key]
      }
    }
  }
  return oldJSON
}
