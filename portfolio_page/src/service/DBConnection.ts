// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const options = {
  ssl: true, // Explicitly enable TLS
  tlsAllowInvalidCertificates: false, // Don't skip cert validation in prod
  serverSelectionTimeoutMS: 5000, // Timeout if cluster unreachable
};

if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Allow global var in dev mode to persist connection
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
