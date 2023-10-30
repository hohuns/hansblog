import { Dispatch, SetStateAction, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

export const useFirebase = (
  file: any,
  setMedia: Dispatch<SetStateAction<any>>,
  setIsImgUploading: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + (file as any).name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file as any);

      uploadTask.on(
        "state_changed",
        (snapshot: {
          bytesTransferred: number;
          totalBytes: number;
          state: any;
        }) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setIsImgUploading(true);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error: any) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL: SetStateAction<string>) => {
              setIsImgUploading(false);
              setMedia(downloadURL);
            }
          );
        }
      );
    };

    file && upload();
  }, [file, setMedia]);
};
