import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

// Primary connection options
const getPrimaryOptions = () => ({
  // SSL/TLS Configuration - More permissive for deployment environments
  tls: true,
  tlsAllowInvalidCertificates: process.env.NODE_ENV === 'production' ? true : false,
  tlsAllowInvalidHostnames: process.env.NODE_ENV === 'production' ? true : false,
  
  // Connection pool settings
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 30000,
  
  // Connection timeout settings - Increased for production
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 60000,
  connectTimeoutMS: 30000,
  
  // Retry settings
  retryWrites: true,
  retryReads: true,
  
  // Additional options for production environments
  ...(process.env.NODE_ENV === 'production' && {
    ssl: true,
    sslValidate: false,
  }),
});

// Fallback options for problematic SSL environments
const getFallbackOptions = () => ({
  tls: false,
  ssl: false,
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 60000,
  connectTimeoutMS: 30000,
  retryWrites: true,
  retryReads: true,
});

// Create connection with fallback strategy
async function createConnection(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
  }

  try {
    // Try primary connection first
    const client = new MongoClient(uri, getPrimaryOptions());
    await client.connect();
    console.log('Database connected with primary SSL configuration');
    return client;
  } catch (error) {
    console.warn('Primary connection failed, trying fallback configuration:', error);
    
    try {
      // Try fallback without SSL
      const client = new MongoClient(uri, getFallbackOptions());
      await client.connect();
      console.log('Database connected with fallback configuration');
      return client;
    } catch (fallbackError) {
      console.error('Both primary and fallback connections failed');
      throw fallbackError;
    }
  }
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

// In development, use global to avoid re-initializing on every hot reload
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the value across module reloads
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = createConnection();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  clientPromise = createConnection();
}


export default clientPromise;