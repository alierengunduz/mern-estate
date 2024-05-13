import { useState } from "react";
import Input from "../components/ui/Input";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  console.log(formData);
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("Max 6 images allowed");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const  handleRemoveImage = (index) => {
     setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
     })
  }
  return (
    <main className=" pb-5">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <div className="flex items-start w-full gap-x-10 px-5">
        <form className="flex flex-col gap-y-5 w-1/2">
          <div className="flex flex-col gap-y-5">
            <Input
              required
              type="text"
              placeholder="Enter Name"
              id="name"
              name="name"
              maxLength="62"
              minLength="10"
            />
            <textarea
              className="p-2 rounded-md"
              name="description"
              id="description"
              placeholder="Enter Description"
            ></textarea>
            <Input
              required
              type="text"
              placeholder="Adress Name"
              id="address"
              name="address"
              maxLength="130"
              minLength="10"
            />
            <div className="flex items-center justify-between gap-y-2 px-4">
              <div className="flex gap-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="sale"
                  name="sale"
                  className="w-5 cursor-pointer"
                />
                <label htmlFor="sale" className="font-medium cursor-pointer">
                  Sell
                </label>
              </div>
              <div className="flex gap-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="rent"
                  name="rent"
                  className="w-5 cursor-pointer"
                />
                <label htmlFor="rent" className="font-medium cursor-pointer">
                  Rent
                </label>
              </div>
              <div className="flex gap-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="parking"
                  name="parking"
                  className="w-5 cursor-pointer"
                />
                <label
                  htmlFor="parkingSpot"
                  className="font-medium cursor-pointer"
                >
                  Parking spot
                </label>
              </div>
              <div className="flex gap-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="furnished"
                  name="furnished"
                  className="w-5 cursor-pointer"
                />
                <label
                  htmlFor="furnished"
                  className="font-medium cursor-pointer"
                >
                  Furnished
                </label>
              </div>
              <div className="flex gap-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="offer"
                  name="offer"
                  className="w-5 cursor-pointer"
                />
                <label htmlFor="offer" className="font-medium cursor-pointer">
                  Offer
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 mt-4">
              <div className="flex gap-x-2 items-center">
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  className="w-20 h-9 rounded-md pl-2"
                  min="1"
                  max="10"
                />
                <label
                  htmlFor="parkingSpot"
                  className="font-medium cursor-pointer"
                >
                  Beds
                </label>
              </div>
              <div className="flex gap-x-2 cursor-pointer items-center">
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  className="w-20 h-9 rounded-md pl-2"
                  min="1"
                  max="10"
                />
                <label
                  htmlFor="parkingSpot"
                  className="font-medium cursor-pointer"
                >
                  Baths
                </label>
              </div>
              <div className="flex gap-x-2 cursor-pointer items-center">
                <input
                  type="number"
                  id="regularPrice"
                  name="regularPrice"
                  className="w-20 h-9 rounded-md pl-2"
                  min="1"
                  max="10"
                />
                <label
                  htmlFor="parkingSpot"
                  className="font-medium cursor-pointer"
                >
                  Regular Price
                </label>
              </div>
              <div className="flex gap-x-2 cursor-pointer items-center">
                <input
                  type="number"
                  id="discountedPrice"
                  name="discountedPrice"
                  className="w-20 h-9 rounded-md pl-2"
                  min="1"
                  max="10"
                />
                <label
                  htmlFor="parkingSpot"
                  className="font-medium cursor-pointer"
                >
                  Discounted Price
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div>
                <span className="font-bold">Images: </span>
                <span className="text-xs underline">
                  The first image will be the cover (max 6)
                </span>
              </div>
              <div className="flex gap-x-2">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className="border p-2 rounded-md border-gray-300"
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                />
                <button
                  onClick={handleImageSubmit}
                  disabled={uploading}
                  className="border-green-500 text-green-600 border-2 disabled:opacity-80  transition duration-300  px-4 py-1 rounded-md"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              {imageUploadError && (
                <p className="text-red-500 text-sm">{imageUploadError}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-slate-700 text-white hover:bg-slate-900 transition duration-300 rounded-md py-2"
          >
            CREATE LISTING
          </button>
        </form>
        <div className="w-1/2 flex flex-col gap-y-10">
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="border-2 p-2 border-gray-500 flex items-center justify-between w-full h-full"
              >
                <img
                  src={url}
                  alt="listing"
                  className=" h-40 rounded-md object-cover  w-1/2"
                />{" "}
                <button
                  onClick={() => handleRemoveImage(index)}
                  type="button"
                  className="bg-red-600 text-white py-16 hover:bg-red-900 transition duration-300 hover:translate-y-1 px-5 rounded-md  uppercase
               "
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default CreateListing;
