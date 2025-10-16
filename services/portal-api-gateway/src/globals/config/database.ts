import mongoose from 'mongoose';

function setupMongoDB() {
  mongoose
    .connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 5000
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

  return mongoose.connection;
}

export default setupMongoDB;
