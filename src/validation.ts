/** Parse an unambiguous, bounded, positive base-10 integer. */
export function parsePositiveInteger(input: unknown, max = Number.MAX_SAFE_INTEGER): number | null {
  if (!Number.isSafeInteger(max) || max < 1) {
    throw new RangeError('The maximum must be a positive safe integer');
  }
  if (typeof input !== 'string' || !/^[1-9][0-9]*$/.test(input)) {
    return null;
  }
  const value = Number(input);
  return Number.isSafeInteger(value) && value <= max ? value : null;
}

/**
 * Accept an absolute HTTPS destination on one explicitly allowed HTTPS origin.
 * This helper is not a substitute for server-side redirect policy enforcement.
 */
export function isApprovedRedirect(destination: string, allowedOrigin: string): boolean {
  try {
    const allowed = new URL(allowedOrigin);
    const target = new URL(destination);
    // The allowlist entry must be an origin, not a URL with extra components.
    if (allowed.href !== `${allowed.origin}/` || allowed.protocol !== 'https:') return false;
    if (target.protocol !== 'https:') return false;
    if (target.username || target.password) return false;
    return target.origin === allowed.origin;
  } catch {
    return false;
  }
}
