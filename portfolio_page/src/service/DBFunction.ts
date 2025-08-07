import clientPromise from "./DBConnection";
import { ObjectId } from 'mongodb';

interface DatabaseDocument {
  [key: string]: any;
}

interface QueryOptions {
  limit?: number;
  skip?: number;
  sort?: DatabaseDocument;
}

interface OperationResult {
  message: string;
  modifiedCount?: number;
  matchedCount?: number;
  deletedCount?: number;
  insertedId?: any;
}

// Helper function to prepare filter for MongoDB queries
function prepareFilter(filter: DatabaseDocument): DatabaseDocument {
  const prepared = { ...filter };
  
  // Convert string _id to ObjectId if it looks like a MongoDB ObjectId
  if (prepared._id && typeof prepared._id === 'string' && ObjectId.isValid(prepared._id)) {
    prepared._id = new ObjectId(prepared._id);
  }
  
  // Convert string id to ObjectId if it looks like a MongoDB ObjectId and no custom id field exists
  if (prepared.id && typeof prepared.id === 'string' && ObjectId.isValid(prepared.id)) {
    prepared._id = new ObjectId(prepared.id);
    delete prepared.id;
  }
  
  return prepared;
}

// Core database connection helper
async function getDatabase() {
  const client = await clientPromise;
  return client.db(process.env.MONGO_DB);
}

// Main handler function for HTTP-style operations
export async function handlerRequest(
  collectionName: string, 
  req: 'GET' | 'POST' | 'PUT' | 'DELETE', 
  data?: DatabaseDocument,
  filter?: DatabaseDocument
): Promise<any> {
  const db = await getDatabase();
  
  switch (req) {
    case 'GET':
      const preparedGetFilter = filter ? prepareFilter(filter) : {};
      return await db.collection(collectionName).find(preparedGetFilter).toArray();
    
    case 'POST':
      if (!data) throw new Error('No data provided');
      const { id, ...cleanData } = data;
      const insertResult = await db.collection(collectionName).insertOne(cleanData);
      return { 
        message: 'Data inserted successfully', 
        insertedId: insertResult.insertedId 
      };
    
    case 'PUT':
      if (!data || !filter) {
        throw new Error('Both data and filter are required for update operation');
      }
      const preparedUpdateFilter = prepareFilter(filter);
      return await updateDocument(collectionName, preparedUpdateFilter, data);
    
    case 'DELETE':
      if (!filter) throw new Error('Filter is required for delete operation');
      const preparedDeleteFilter = prepareFilter(filter);
      return await deleteDocument(collectionName, preparedDeleteFilter);
    
    default:
      throw new Error(`Method ${req} not allowed`);
  }
}

// Document operations
export async function findDocuments(
  collectionName: string, 
  filter: DatabaseDocument = {},
  options?: QueryOptions
): Promise<any[]> {
  const db = await getDatabase();
  const preparedFilter = prepareFilter(filter);
  let query = db.collection(collectionName).find(preparedFilter);
  
  if (options?.sort) query = query.sort(options.sort);
  if (options?.skip) query = query.skip(options.skip);
  if (options?.limit) query = query.limit(options.limit);
  
  return await query.toArray();
}

export async function insertDocument(
  collectionName: string, 
  data: DatabaseDocument
): Promise<OperationResult> {
  const db = await getDatabase();
  
  // If data has an 'id' field, remove it to avoid conflicts with MongoDB's _id
  const { id, ...cleanData } = data;
  
  const result = await db.collection(collectionName).insertOne(cleanData);
  
  return { 
    message: 'Document inserted successfully', 
    insertedId: result.insertedId 
  };
}

export async function updateDocument(
  collectionName: string, 
  filter: DatabaseDocument, 
  updateData: DatabaseDocument
): Promise<OperationResult> {
  const db = await getDatabase();
  
  // Remove 'id' from updateData to avoid conflicts
  const { id, ...cleanUpdateData } = updateData;
  
  // First, check if the document exists for better error reporting
  const existingDoc = await db.collection(collectionName).findOne(filter);
  if (!existingDoc) {
    // Try to find documents in the collection to help with debugging
    const totalDocs = await db.collection(collectionName).countDocuments();
    const sampleDoc = await db.collection(collectionName).findOne({});
    
    throw new Error(
      `No document found matching the filter. ` +
      `Collection: ${collectionName}, ` +
      `Filter: ${JSON.stringify(filter)}, ` +
      `Total documents in collection: ${totalDocs}` +
      (sampleDoc ? `, Sample document structure: ${JSON.stringify(Object.keys(sampleDoc))}` : '')
    );
  }
  
  const result = await db.collection(collectionName).updateOne(filter, { $set: cleanUpdateData });
  
  return { 
    message: 'Document updated successfully', 
    modifiedCount: result.modifiedCount,
    matchedCount: result.matchedCount 
  };
}

export async function deleteDocument(
  collectionName: string, 
  filter: DatabaseDocument
): Promise<OperationResult> {
  const db = await getDatabase();
  const preparedFilter = prepareFilter(filter);
  
  // Check if document exists before attempting deletion
  const existingDoc = await db.collection(collectionName).findOne(preparedFilter);
  if (!existingDoc) {
    const totalDocs = await db.collection(collectionName).countDocuments();
    const sampleDoc = await db.collection(collectionName).findOne({});
    
    throw new Error(
      `No document found matching the filter for deletion. ` +
      `Collection: ${collectionName}, ` +
      `Filter: ${JSON.stringify(filter)}, ` +
      `Total documents in collection: ${totalDocs}` +
      (sampleDoc ? `, Sample document structure: ${JSON.stringify(Object.keys(sampleDoc))}` : '')
    );
  }
  
  const result = await db.collection(collectionName).deleteOne(preparedFilter);
  
  return { 
    message: 'Document deleted successfully', 
    deletedCount: result.deletedCount 
  };
}

// Utility functions
export async function getCollectionNames(): Promise<string[]> {
  const db = await getDatabase();
  const collections = await db.listCollections().toArray();
  return collections.map(collection => collection.name);
}

export async function countDocuments(
  collectionName: string, 
  filter: DatabaseDocument = {}
): Promise<number> {
  const db = await getDatabase();
  const preparedFilter = prepareFilter(filter);
  return await db.collection(collectionName).countDocuments(preparedFilter);
}

export async function documentExists(
  collectionName: string, 
  filter: DatabaseDocument
): Promise<boolean> {
  const db = await getDatabase();
  const preparedFilter = prepareFilter(filter);
  const count = await db.collection(collectionName).countDocuments(preparedFilter, { limit: 1 });
  return count > 0;
}

// Helper function to find by ID
export async function findById(
  collectionName: string, 
  id: string | number
): Promise<any> {
  const db = await getDatabase();
  const filter = { id: id };
  const preparedFilter = prepareFilter(filter);
  return await db.collection(collectionName).findOne(preparedFilter);
}

// Helper function to update by ID
export async function updateById(
  collectionName: string, 
  id: string | number, 
  updateData: DatabaseDocument
): Promise<OperationResult> {
  const filter = { id };
  const preparedFilter = prepareFilter(filter);
  return await updateDocument(collectionName, preparedFilter, updateData);
}

// Helper function to delete by ID
export async function deleteById(
  collectionName: string, 
  id: string | number
): Promise<OperationResult> {
  const filter = { id };
  const preparedFilter = prepareFilter(filter);
  return await deleteDocument(collectionName, preparedFilter);
}

