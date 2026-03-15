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
  console.log("DB connection closed")
  await mongoose.disconnect()
};

/**
 * Sends user registration data to the API endpoint.
 * Called during user account creation process.
 *
 * @param userName - User's display name
 * @param email - User's email address
 * @param password - User's password (should be hashed before sending)
 * @return Response from registration API
 * @category Authentication
 * @security Password should be transmitted over HTTPS only, never logged
 * @performance Network I/O, asynchronous non-blocking request
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
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