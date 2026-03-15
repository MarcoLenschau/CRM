import mongoose from "mongoose";

interface CacheType {
  con: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const cache: CacheType = { con: null, promise: null };


const dbConnect = async () => {
  if (cache.con) {
    console.log("Connection sucess");
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

const dbDisconnect = async () => {
  console.log("DB connection closed")
  await mongoose.disconnect()
};

const mongodb = {dbConnect, dbDisconnect};
export default mongodb;