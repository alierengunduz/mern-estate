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
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
const Profile = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);


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
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  console.log("currentUser",currentUser);
  return (
    <div className="p-3 max-w-lg  mx-auto">
      <h1 className="text-3xl font-bold tracking-wide text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-5  mt-5">
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
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-600">
              File upload failed (image must be less than 2 mb){" "}
            </span>
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
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="Email..."
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Password..."
          onChange={handleChange}
        />
        <Button disabled={loading} type="submit">
          {loading ? 'Loading...' : 'Update'}
        </Button>
      </form>
      <div className="w-full flex items-center justify-between">
        <span className="text-red-700 cursor-pointer hover:underline transition duration-300">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer hover:underline transition duration-300">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-4">
        {error ? error : ""}
      </p>
      <p className="text-green-700 mt-4">
        {updateSuccess ? "Profile updated successfully!" : ""}
      </p>
    </div>
  );
};

export default Profile;
