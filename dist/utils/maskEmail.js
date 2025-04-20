export function maskEmail(email) {
    const [name, domain] = email.split("@");
    const nameLength = name.length / 2;
    return `${name.slice(0, Math.round(nameLength))}***@${domain}`;
}
