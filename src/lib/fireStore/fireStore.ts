import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '$lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const addTestDoc = async () => {
	try {
		const docRef = await addDoc(collection(db, 'users'), {
			first: 'Ada',
			last: 'Lovelace',
			born: 1815
		});
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

const getTestDoc = async () => {
	const querySnapshot = await getDocs(collection(db, 'users'));
	querySnapshot.forEach((doc) => {
		console.log(`${doc.id}` , doc.data());
	});
};

export {addTestDoc, getTestDoc}