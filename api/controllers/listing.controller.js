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

export {
  createListing,
  deleteListing,
  updateListing,
  getListing
};
