import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

client = new MongoClient(uri, options);
clientPromise = client.connect();


export default clientPromise;