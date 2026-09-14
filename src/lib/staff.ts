import { site } from "@/src/config/site";
import { teams } from "@/src/data/teams";

/**
 * Emails allowed to read registrations. Keep in sync with the allowlist in
 * firestore.rules; the rules are what actually enforce it.
 */
export const staffEmails: string[] = [
  ...site.officers.map((o) => o.email),
  ...teams.flatMap((t) => t.leads.map((l) => l.email)),
].map((e) => e.toLowerCase());

export const isStaffEmail = (email?: string | null) =>
  !!email && staffEmails.includes(email.toLowerCase());
