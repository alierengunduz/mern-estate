import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
      name:{
            type: String,
            required: true,
             trim: true
      },
      description:{
            type: String,
            required: true,
             trim: true
      },
      address:{
            type: String,
            required: true,
             trim: true
      },
      regularPrice:{
            type: Number,
            required: true,
             trim: true
      },
      discountPrice:{
         type:Number,
         required:true,
         trim:true
      },
      bathrooms:{
            type: Number,
            required: true,
             trim: true
      },
      bedrooms:{
            type: Number,
            required: true,
             trim: true
      },
      furnished:{
            type: Boolean,
            required: true,
      },
      parking:{
            type: Boolean,
            required: true,
      },
      type:{
            type: String,
            required: true,
             trim: true
      },
      location:{
            type: String,
            required: true,
             trim: true
      },
      category:{
            type: String,
            required: true,
             trim: true
      },
      offer:{
            type: Boolean,
            required: true,
      },
      imageUrls:{
            type: Array,
            required: true,
      },
      userRef:{
            type:String,
            required:true,
      }
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;