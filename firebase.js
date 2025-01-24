import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: "fanationapp.firebasestorage.app",
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file, chave) {
	const fileExt = file.name.substring(file.name.lastIndexOf('.')+1, file.name.length) || file.name;
	const storageRef = ref(storage, `/assets/${chave}.${fileExt}`);
	let path;
	try {
		await uploadBytes(storageRef, file)
		.then (async snapshot => {h
			await(getDownloadURL(storageRef))
			.then(url => {
				console.log("File available at", url);
				path = url;
			})
		});
	}
	catch (error) {
		console.error(error);
	}

	return path;
}

export async function deleteFile(chave, fileExt) {
	const storageRef = ref(storage, `/assets/${chave}.${fileExt}`);

	try {
		await deleteObject(storageRef);
	}
	catch (error) {
		console.error(error);
	}
}