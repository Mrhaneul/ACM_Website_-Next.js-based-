const CBU_EMAIL_RE = /^[^\s@]+@calbaptist\.edu$/i;
const CBU_ID_RE = /^[0-9]+$/;

export function isValidCbuEmail(email: string): boolean {
  return CBU_EMAIL_RE.test(String(email).trim());
}

export function isValidCbuId(id: string): boolean {
  return CBU_ID_RE.test(String(id).trim());
}
