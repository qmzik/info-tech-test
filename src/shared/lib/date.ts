export function currentYear(): number {
  return new Date().getFullYear()
}

export function maxCatalogYear(): number {
  return currentYear() + 1
}
