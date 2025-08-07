// Admin Panel Types

export interface AdminAuthProps {
  onAuthenticated: (token: string) => void;
}

export interface CrudManagerProps {
  token: string;
}

export interface DatabaseDocument {
  _id?: string;
  [key: string]: any;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface CollectionsResponse {
  collections: string[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface OperationResult {
  message: string;
  modifiedCount?: number;
  matchedCount?: number;
  deletedCount?: number;
  insertedId?: any;
}

export interface EditFormProps {
  doc: DatabaseDocument;
  onSave: (doc: DatabaseDocument) => void;
  onChange: (doc: DatabaseDocument) => void;
}
