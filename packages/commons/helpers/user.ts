export function getDisplayName(user: {
  name?: string
  surname?: string
  username: string
}) {
  if (
    (!user.name || user.name === '') &&
    (!user.surname || user.surname === '')
  ) {
    return user.username
  }

  return `${user.name || ''} ${user.surname || ''}`.trim()
}
