// Registrations live in the main site's Firestore (acm-website-459ef).
// Anyone can create one (see firestore.rules); only officers and team leads
// can read them, from /register/admin.
import { db } from "./firebase";

export const registrationDb = db;
export const REGISTRATIONS_COLLECTION = "registrations";
