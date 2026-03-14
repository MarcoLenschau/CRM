import mongoose from "mongoose";

let cache = global.mongoose;


if (!cache) {
  cache = global.mongoose = { con: null, promise: null };
}

const dbConnect = async () => {
  if (cache.con) {
    console.log("Connection sucess");
    return cache.con;
  } else if (!cache.promise) {
    const options = {
      bufferCommands: false
    };
    cache.promise = mongoose.connect(process.env.MONGODB_URI, options).then(mongoose => {
      console.log("DB connection started")
      return mongoose;
    });
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