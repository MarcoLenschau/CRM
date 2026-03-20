import mongoose from "mongoose";

interface CacheType {
  con: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const cache: CacheType = { con: null, promise: null };

/**
 * Establishes connection to MongoDB using Mongoose.
 * Uses caching to reuse connections across requests.
 *
 * @return Connected Mongoose instance
 * @category Database
 * @security Uses MONGODB_URI from environment variables, validates connection
 * @performance Cached connection pooling with reuse across requests
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
const dbConnect = async () => {
  if (cache.con) {
    return cache.con;
  }
  if (!cache.promise) {
    const options = {
      bufferCommands: false
    };
    cache.promise = mongoose.connect(process.env.MONGODB_URI!, options);
  }
  cache.con = await cache.promise;
  return cache.con;
};

/**
 * Closes MongoDB connection and disconnects Mongoose.
 *
 * @return void
 * @category Database
 * @security Ensures proper cleanup of database connections
 * @performance Cleanup operation with connection pool release
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
const dbDisconnect = async () => {
  await mongoose.disconnect()
};

const mongodb = {dbConnect, dbDisconnect};
export default mongodb;