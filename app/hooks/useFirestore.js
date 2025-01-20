import { uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

const useFirestore = () => {
    const uploadFile = async (file) => {
        const storageRef = ref(storage, file.name);
        await uploadBytesResumable(storageRef, file)
        .then()
        .catch((error) => {
            console.log(error)
        });
    };

    return {
        uploadFile
    }
}