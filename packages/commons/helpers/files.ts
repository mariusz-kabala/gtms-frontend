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
  return files.reduce((filesObj: any, file) => {
    const { url, size, ext } = parseFile(file)
    if (!filesObj[size]) {
      filesObj[size] = {}
    }

    filesObj[size][ext] = url

    return filesObj
  }, {})
}
