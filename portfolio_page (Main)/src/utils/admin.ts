// Utility functions for admin operations

export const validateJsonString = (jsonString: string): { isValid: boolean; error?: string; data?: any } => {
  try {
    const data = JSON.parse(jsonString);
    return { isValid: true, data };
  } catch (error) {
    return { 
      isValid: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON format' 
    };
  }
};

export const formatError = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
};

export const formatDocumentForDisplay = (doc: any) => {
  const formatted = { ...doc };
  
  // Format date fields for better display
  Object.keys(formatted).forEach(key => {
    const value = formatted[key];
    if (value instanceof Date) {
      formatted[key] = value.toISOString();
    } else if (typeof value === 'object' && value !== null && value.$date) {
      formatted[key] = new Date(value.$date).toISOString();
    }
  });
  
  return formatted;
};

export const prepareDocumentForSave = (doc: any) => {
  const prepared = { ...doc };
  
  // Remove empty strings and null values
  Object.keys(prepared).forEach(key => {
    if (prepared[key] === '' || prepared[key] === null) {
      delete prepared[key];
    }
  });
  
  return prepared;
};

export const getFieldType = (value: any): string => {
  if (value === null || value === undefined) return 'string';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'object') return 'object';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  return 'string';
};

export const safeStringify = (value: any, indent: number = 2): string => {
  try {
    if (typeof value === 'string') return value;
    return JSON.stringify(value, null, indent);
  } catch {
    return String(value);
  }
};
