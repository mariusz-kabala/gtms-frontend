export function validatePassword(pass: string): boolean {
  const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/

  return re.test(pass)
}
