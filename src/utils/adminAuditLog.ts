/**
 * adminAuditLog.ts — Lightweight append-only admin audit log
 *
 * Stores up to MAX_ENTRIES entries in localStorage.
 * Each entry records who did what and when.
 */

export interface AuditEntry {
  /** ISO timestamp */
  timestamp: string;
  /** Short action identifier, e.g. 'feature_toggle', 'user_role_change' */
  action: string;
  /** Human-readable description */
  description: string;
  /** Optional metadata (stringified JSON) */
  meta?: string;
}

const STORAGE_KEY = 'admin_audit_log';
const MAX_ENTRIES = 200;

// ─────────────────────────────────────────────────
// Read
// ─────────────────────────────────────────────────

/** Returns all audit entries, newest first */
export function getAuditLog(): AuditEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────
// Write
// ─────────────────────────────────────────────────

/**
 * Append a new entry to the audit log.
 * Trims to MAX_ENTRIES (oldest entries are dropped first).
 */
export function appendAuditEntry(
  action: string,
  description: string,
  meta?: Record<string, unknown>
): void {
  const existing = getAuditLog();

  const entry: AuditEntry = {
    timestamp: new Date().toISOString(),
    action,
    description,
    meta: meta ? JSON.stringify(meta) : undefined,
  };

  const updated = [entry, ...existing].slice(0, MAX_ENTRIES);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage quota exceeded — do nothing, log is non-critical
  }
}

/** Clear the entire audit log */
export function clearAuditLog(): void {
  localStorage.removeItem(STORAGE_KEY);
}
