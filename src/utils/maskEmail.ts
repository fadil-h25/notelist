export function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  const nameLength = name.length / 2;

  return `${name.slice(0, Math.round(nameLength))}***@${domain}`;
}
