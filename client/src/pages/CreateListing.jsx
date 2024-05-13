import Input from "../components/ui/Input";

const CreateListing = () => {
  return (
    <main className=" pb-5">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <div className="flex items-start w-full gap-5 px-5">
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
                <span className="text-xs underline">The first image will be the cover (max 6)</span>
              </div>
              <div className="flex gap-x-2">
                <input className="border p-2 rounded-md border-gray-300" type="file" id="images" name="images" accept="image/*" multiple />
                <button   className="border-green-500 text-green-600 border-2 disabled:opacity-80  transition duration-300  px-4 py-1 rounded-md">UPLOAD</button>
              </div>
            </div>
            <button type="submit" className="bg-slate-700 text-white hover:bg-slate-900 transition duration-300 rounded-md py-2">CREATE LISTING</button>
          </div>
        </form>
        <div className="w-1/2">2222222</div>
      </div>
    </main>
  );
};

export default CreateListing;
