import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(errorHandler(400, "Invalid ObjectId"));
  }

  const listing = await Listing.findById(id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings"));
  }

  try {
    await Listing.findByIdAndDelete(id);
    res.status(200).json('Listing has been deleted');
  } catch (error) {
    next(error);
  }
};

const updateListing = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(errorHandler(400, "Invalid ObjectId"));
  }

  const listing = await Listing.findById(id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

const getListing = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404, "Listing not found"));
      }
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
}

const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    let location = req.query.location;

    if (location === undefined || location === 'all') {
      location = { $in: ['aydin', 'izmir', 'ankara', 'istanbul', 'mugla', 'antalya'] };
    }

    let category = req.query.category;

    if (category === undefined || category === 'all') {
      category = { $in: ['house', 'apartment', 'villa', 'office', 'store', 'land'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
      location,
      category
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings
};
