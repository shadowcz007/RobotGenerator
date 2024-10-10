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

export function deepEqual (obj1:any, obj2:any) {
  if (obj1 === obj2) {
    return true
  }

  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false
  }

  let keys1 = Object.keys(obj1)
  let keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}
