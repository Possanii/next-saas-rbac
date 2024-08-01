export function getInitialFromName(name: string): string {
  return name
    .split(' ')
    .map((value) => value.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}
