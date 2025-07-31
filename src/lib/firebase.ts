import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	PUBLIC_FIREBASE_APP_ID
} from '$env/static/public';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { authUser } from '$lib/authStore';

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let firebaseApp: FirebaseApp;

if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApps()[0];
}

// Auth
const firebaseAuth = getAuth(firebaseApp);

setPersistence(firebaseAuth, browserLocalPersistence)
	// .then(() => {
	// 	// Existing and future Auth states are now persisted in the current
	// 	// session only. Closing the window would clear any existing state even
	// 	// if a user forgets to sign out.
	// 	// ...
	// 	// New sign-in will be persisted with session persistence.
	// 	return signInWithEmailAndPassword(firebaseAuth, email, password);
	// })
	.catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		console.error('Firebase Auth Persistence Error:', errorCode, errorMessage);
	});

firebaseAuth.onAuthStateChanged((user) => {
	if (user) {
		authUser.set({
			uid: user.uid,
			email: user.email || ''
		});
		console.log('User signed in');
	} else {
		console.log('User not signed in');
	}
});

export { firebaseApp, firebaseAuth, firebaseConfig };
