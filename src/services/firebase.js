// Firebase setup for StudyFlow AI
// Fill in your project credentials in a .env file (see .env.example)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// --- Auth helpers -----------------------------------------------------
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

export async function registerWithEmail(name, email, password) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  if (name) {
    await updateProfile(credential.user, { displayName: name });
  }
  return credential.user;
}

export async function loginWithEmail(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logout() {
  await signOut(auth);
}

// --- Firestore helpers (notes) -----------------------------------------
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

export function subscribeToNotes(userId, callback) {
  const notesQuery = query(
    collection(db, 'notes'),
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc')
  );
  return onSnapshot(notesQuery, (snapshot) => {
    const notes = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(notes);
  });
}

export async function createNote(userId, { title, content }) {
  return addDoc(collection(db, 'notes'), {
    userId,
    title,
    content,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateNote(noteId, { title, content }) {
  return updateDoc(doc(db, 'notes', noteId), {
    title,
    content,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteNote(noteId) {
  return deleteDoc(doc(db, 'notes', noteId));
}
