import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
	
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file, chave) {
	const fileExt = file.name.substring(file.name.lastIndexOf('.')+1, file.name.length) || file.name;
	const storageRef = ref(storage, `/assets/${chave}.${fileExt}`);

	try {
		await uploadBytes(storageRef, file)
		.then (async snapshot => {
			await(getDownloadURL(storageRef))
			.then(url => {
				console.log("File available at", url);
				return url;
			})
		});
	}
	catch (error) {
		console.error(error);
	}
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