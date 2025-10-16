import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    randomNumber: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => /^\d{6}$/.test(value),
        message: 'randomNumber must be exactly 6 digits'
      }
    },
    accessToken: {
      type: String,
      required: true
    },
    used: {
      type: Boolean,
      default: false
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

// TTL index to auto-remove expired documents
verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Verification = mongoose.model('Verification', verificationSchema);

export default Verification;


