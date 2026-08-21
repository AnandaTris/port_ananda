import { redactSensitiveText, requiresApproval } from './guardian'

test('redacts email, Singapore phone, and NRIC values while preserving surrounding text', () => {
  expect(redactSensitiveText('Email ada@example.com or call +65 9123 4567')).toBe(
    'Email [EMAIL REDACTED] or call [PHONE REDACTED]',
  )
  expect(redactSensitiveText('S1234567D')).toBe('[NRIC REDACTED]')
})

test('redacts emails regardless of casing', () => {
  expect(redactSensitiveText('ADA@EXAMPLE.COM')).toBe('[EMAIL REDACTED]')
})

test.each([
  'Submit this referral',
  'Book home nursing tomorrow',
  'Apply for support',
  'Escalate this case',
  'Call 995 now',
  'Handover to the next shift',
])('requires human approval for risky action: %s', (action) => {
  expect(requiresApproval(action)).toBe(true)
})

test('does not require approval for a non-action request', () => {
  expect(requiresApproval('Show nearby services')).toBe(false)
})
