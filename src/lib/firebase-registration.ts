// Second Firebase app instance, pointed at the acm-cbu-open-house project
// (see .firebaserc "registration" alias) so registration data stays where
// it already lives rather than migrating into the main site's project.
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const registrationFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_REG_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_REG_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_REG_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_REG_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_REG_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_REG_FIREBASE_APP_ID,
};

const REGISTRATION_APP_NAME = 'registration';

const registrationApp = getApps().some((app) => app.name === REGISTRATION_APP_NAME)
  ? getApp(REGISTRATION_APP_NAME)
  : initializeApp(registrationFirebaseConfig, REGISTRATION_APP_NAME);

export const registrationDb = getFirestore(registrationApp);
export const REGISTRATIONS_COLLECTION = 'registrations';
