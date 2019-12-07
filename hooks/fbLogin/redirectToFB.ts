export function refirectToFB(params: string): void {
  window.location.href = `https://www.facebook.com/dialog/oauth${params}`
}
