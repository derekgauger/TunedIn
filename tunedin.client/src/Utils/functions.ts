export function getUnixTime(): number {
  return Math.floor(Date.now() / 1000);
}

export function parsePhoneNumber(phone: string): string {
  const match = phone.match(/\d+/g);
  return match ? match.join('') : '';
}