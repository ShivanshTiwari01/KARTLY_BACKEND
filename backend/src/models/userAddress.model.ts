import mongoose from 'mongoose';
import UserProfile from './userProfile.model';

const userAddressSchema = new mongoose.Schema(
  {
    addressLineOne: {
      type: String,
      required: true,
    },
    addressLineTwo: {
      type: String,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    landMark: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    DialCode: {
      type: String,
    },
    userProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserProfile,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserAddress = mongoose.model('UserAddress', userAddressSchema);

export default UserAddress;
