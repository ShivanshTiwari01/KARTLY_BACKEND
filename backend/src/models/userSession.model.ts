import mongoose from 'mongoose';
import User from './user.model';

const userSessionSchema = new mongoose.Schema(
  {
    accessToken: {
      type: String,
      required: true,
      trim: true,
    },
    refreshToken: {
      type: String,
      required: true,
      trim: true,
    },
    accessTokenExpiry: {
      type: Date,
      required: true,
    },
    refreshTokenExpiry: {
      type: Date,
      required: true,
    },
    deviceDetails: {
      type: JSON,
    },
    userLocation: {
      type: JSON,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserSession = mongoose.model('UserSession', userSessionSchema);

export default UserSession;
