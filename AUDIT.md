# Re-Audit Report

**Date:** 2026-02-16  
**Scope:** `src/` application code (chat API/UI and contact flow prioritized)

## Findings

### 1. High - Contact form claims delivery but never sends any message
- **Where:** `src/components/ui/secure-message-gateway.tsx:54`, `src/components/ui/secure-message-gateway.tsx:55`, `src/components/ui/contact-page.tsx:190`
- **What:** The “Secure Message Gateway” simulates success via `setTimeout`; it only calls optional `onSubmit`, and `ContactPage` does not provide one.
- **Impact:** Users see “Transmitted” even though no message is delivered.
- **Recommendation:** Wire to a real backend endpoint, or clearly label as demo and remove delivery claims.

### 2. High - Chat API forwards unvalidated message roles (system-role injection)
- **Where:** `src/app/swarp-ai/api/chat/route.ts:340`, `src/app/swarp-ai/api/chat/route.ts:341`, `src/app/swarp-ai/api/chat/route.ts:357`
- **What:** `messages[].role` is not runtime-validated before forwarding upstream.
- **Impact:** Malicious clients can submit extra `system` messages and weaken server prompt control.
- **Recommendation:** Add runtime schema validation and strictly allow only `"user"` and `"assistant"` roles.

### 3. Medium - User stop action is treated as an error
- **Where:** `src/app/swarp-ai/_components/SwarpAIChat.tsx:171`, `src/app/swarp-ai/_components/SwarpAIChat.tsx:174`, `src/app/swarp-ai/_components/SwarpAIChat.tsx:246`
- **What:** `stop()` aborts fetch, but `catch` always sets error state/message.
- **Impact:** Normal cancellation appears as failure, degrading UX and observability.
- **Recommendation:** Detect `AbortError` and mark canceled/done without error text.

### 4. Low - Upstream error details are returned to clients
- **Where:** `src/app/swarp-ai/api/chat/route.ts:385`, `src/app/swarp-ai/api/chat/route.ts:389`
- **What:** Truncated upstream error text is included in client JSON responses.
- **Impact:** Can leak provider/internal details.
- **Recommendation:** Return generic client errors; keep detailed text server-side only.

## Checks Run
- Type check: `npx tsc --noEmit --incremental false` passed.
- Lint could not run in this environment because it requires writing `.next` cache and the sandbox is read-only.

## Residual Risk
- No integration/e2e validation of actual message delivery or external AI provider behavior in this sandbox.

## File Write Status
Could not write this report to `./AUDIT.md` because the workspace is mounted read-only in this session (`Permission denied`).
