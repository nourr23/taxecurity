export function getItem<T>(key: string): any {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) || null : null;
}

export function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function removeItem(key: string) {
  localStorage.removeItem(key);
}
