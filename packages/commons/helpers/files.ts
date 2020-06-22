import { FileStatus } from '../enums'

export function parseFile(file: string) {
  const [, path] = file
    .replace('http://', '')
    .replace('https://', '')
    .split('/')

  const [name, ext] = path.split('.')
  const [size] = name.split('-')

  return {
    url: file,
    size,
    ext,
  }
}

export function parseFiles(files: string[]) {
  if (!Array.isArray(files) || files.length === 0) {
    return {}
  }

  return files.reduce((filesObj: any, file) => {
    const { url, size, ext } = parseFile(file)
    if (!filesObj[size]) {
      filesObj[size] = {}
    }

    filesObj[size][ext] = url

    return filesObj
  }, {})
}

export function getImage(
  size: string,
  obj?: {
    status?: FileStatus
    files?: string[] | any
  },
  fallback?: { [key: string]: { jpg: string; webp?: string } }
): {
  jpg: string
  webp?: string
} {
  const getFallback = () => {
    if (fallback && fallback[size]) {
      return fallback[size]
    }

    return {
      jpg: `//via.placeholder.com/${size}`,
    }
  }

  if (obj && obj.status === FileStatus.ready) {
    const files = Array.isArray(obj.files) ? parseFiles(obj.files) : obj.files

    return files[size] ?? getFallback()
  }

  return getFallback()
}
