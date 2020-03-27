export function decodeParam(paramString: string, key: string) {
  return decodeURIComponent(
    paramString.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  )
}

export function getParamsFromObject(params: {
  [key: string]: string | boolean | number
}) {
  return (
    '?' +
    Object.keys(params)
      .map((param) => `${param}=${encodeURIComponent(params[param])}`)
      .join('&')
  )
}
