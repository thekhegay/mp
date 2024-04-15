export function generateRandomId(): string {
  const dateRandomizer = Date.now().toString(36);
  const mathRandomizer = Math.random().toString(36).substring(2);
  return `${dateRandomizer}${mathRandomizer}`;
}
