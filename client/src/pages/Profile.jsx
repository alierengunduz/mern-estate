import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useRef, useState, useEffect } from "react";
const Profile = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const { user } = useSelector((state) => state.user);
  const { currentUser } = user;
  // firebase storage
  //  allow read;
  //  allow write:if
  //  request.resource.size < 2 * 1024 * 1024 &&
  //  request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg  mx-auto">
      <h1 className="text-3xl font-bold tracking-wide text-center">Profile</h1>
      <form className="flex flex-col gap-y-5  mt-5">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="w-20 h-20 object-cover cursor-pointer rounded-full mx-auto"
          src={ formData.avatar || currentUser?.rest.avatar}
          alt="profile"
        />
        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-600">File upload failed (image must be less than 2 mb) </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-600">Uploading {filePerc}%</span>
          ) : filePerc === 100 ? (
            <span className="text-green-600">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <Input
          name="username"
          id="username"
          type="text"
          placeholder="Username..."
        />
        <Input name="email" id="email" type="email" placeholder="Email..." />
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Password..."
        />
        <Button type="submit">UPDATE</Button>
      </form>
      <div className="w-full flex items-center justify-between">
        <span className="text-red-700 cursor-pointer hover:underline transition duration-300">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer hover:underline transition duration-300">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
