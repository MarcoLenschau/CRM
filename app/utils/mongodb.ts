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

const fetchData = async(userName: string, email: string, password: string): Promise<Response> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      name: userName,
      email: email,
      password: password
    })
  });
  return response;
};

const mongodb = {dbConnect, dbDisconnect};
export default mongodb;