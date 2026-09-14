import { redirect } from "next/navigation";

// The website's /join flow is the one sign-up form; it writes to the same
// registrations collection this page used to. /register/admin still works.
export default function RegisterRedirect() {
  redirect("/join");
}
