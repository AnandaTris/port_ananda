const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
const singaporePhonePattern = /(?:\+65[\s-]?)?[689]\d{3}[\s-]?\d{4}\b/g
const nricPattern = /\b[STFG]\d{7}[A-Z]\b/gi
const approvalPattern = /\b(?:submit|book|apply|escalate|handover)\b|\bcall\s*995\b/i

export function redactSensitiveText(value: string): string {
  return value
    .replace(emailPattern, '[EMAIL REDACTED]')
    .replace(singaporePhonePattern, '[PHONE REDACTED]')
    .replace(nricPattern, '[NRIC REDACTED]')
}

export function requiresApproval(value: string): boolean {
  return approvalPattern.test(value)
}
