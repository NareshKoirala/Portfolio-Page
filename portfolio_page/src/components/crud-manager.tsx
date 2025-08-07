import { useState, useEffect } from 'react';
import styles from '../styles/admin.module.css';
import { validateJsonString, formatError, safeStringify } from '../utils/admin';

interface Document {
  _id?: string;
  [key: string]: any;
}

interface CrudManagerProps {
  token: string;
}

export default function CrudManager({ token }: CrudManagerProps) {
  const [collections, setCollections] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoc, setNewDoc] = useState<string>('{}');
  const [error, setError] = useState('');

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // Fetch collections on mount
  useEffect(() => {
    fetchCollections();
  }, []);

  // Fetch documents when collection changes
  useEffect(() => {
    if (selectedCollection) {
      fetchDocuments();
    }
  }, [selectedCollection]);

  const fetchCollections = async () => {
    try {
      const response = await fetch('/api/admin/collections', { headers });
      const data = await response.json();
      setCollections(data.collections || []);
    } catch (err) {
      setError('Failed to fetch collections');
    }
  };

  const fetchDocuments = async () => {
    if (!selectedCollection) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/${selectedCollection}`, { headers });
      const data = await response.json();
      setDocuments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch documents');
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (doc: Document) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const filter = doc._id ? { _id: doc._id } : doc;
      const response = await fetch(`/api/admin/${selectedCollection}`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ filter }),
      });

      if (response.ok) {
        await fetchDocuments();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Delete failed');
      }
    } catch (err) {
      setError('Failed to delete document');
    }
  };

  const handleUpdate = async (doc: Document) => {
    try {
      const filter = { _id: doc._id };
      const { _id, ...updateData } = doc;
      
      const response = await fetch(`/api/admin/${selectedCollection}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ filter, data: updateData }),
      });

      if (response.ok) {
        await fetchDocuments();
        setEditingDoc(null);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Update failed');
      }
    } catch (err) {
      setError('Failed to update document');
    }
  };

  const handleAdd = async () => {
    const validation = validateJsonString(newDoc);
    if (!validation.isValid) {
      setError(`Invalid JSON: ${validation.error}`);
      return;
    }

    try {
      const response = await fetch(`/api/admin/${selectedCollection}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(validation.data),
      });

      if (response.ok) {
        await fetchDocuments();
        setShowAddForm(false);
        setNewDoc('{}');
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Add failed');
      }
    } catch (err) {
      setError(formatError(err));
    }
  };

  const formatValue = (value: any): string => {
    return safeStringify(value);
  };

  const parseValue = (value: string, originalType: string): any => {
    if (originalType === 'object') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    if (originalType === 'number') {
      const num = Number(value);
      return isNaN(num) ? value : num;
    }
    if (originalType === 'boolean') {
      return value === 'true';
    }
    return value;
  };

  const getPlaceholderForCollection = (collectionName: string): string => {
    switch (collectionName.toLowerCase()) {
      case 'projects':
        return `{
  "id": 1,
  "title": "My Awesome Project",
  "description": "A detailed description of the project",
  "technologies": ["React", "TypeScript", "Node.js"],
  "githubUrl": "https://github.com/username/repo",
  "liveUrl": "https://example.com",
  "imageUrl": "/images/project.jpg"
}`;
      case 'skills':
        return `{
  "category": "Frontend",
  "skills": [
    {"name": "React", "level": 90},
    {"name": "TypeScript", "level": 85}
  ]
}`;
      case 'info':
        return `{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 234 567 8900",
  "location": "New York, NY",
  "bio": "Software developer with 5+ years experience"
}`;
      default:
        return '{"key": "value"}';
    }
  };

  return (
    <div className={styles.crudContainer}>
      <div className={styles.header}>
        <h2>Database Management</h2>
        <div className={styles.collectionSelector}>
          <label>Collection:</label>
          <select 
            value={selectedCollection} 
            onChange={(e) => setSelectedCollection(e.target.value)}
          >
            <option value="">Select a collection</option>
            {collections.map(collection => (
              <option key={collection} value={collection}>
                {collection}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {selectedCollection && (
        <div className={styles.collectionData}>
          <div className={styles.actions}>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className={styles.addButton}
            >
              {showAddForm ? 'Cancel' : 'Add Document'}
            </button>
            <button onClick={fetchDocuments} className={styles.refreshButton}>
              Refresh
            </button>
          </div>

          {showAddForm && (
            <div className={styles.addForm}>
              <h3>Add New Document</h3>
              <div style={{ marginBottom: '1rem', padding: '12px', background: 'rgba(0,123,255,0.1)', borderRadius: '6px', border: '1px solid rgba(0,123,255,0.3)' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#007bff', fontSize: '14px' }}>
                  Collection: {selectedCollection.charAt(0).toUpperCase() + selectedCollection.slice(1)}
                </h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#6c757d' }}>
                  Enter JSON format. Example templates based on collection type are shown below.
                </p>
              </div>
              <textarea
                value={newDoc}
                onChange={(e) => setNewDoc(e.target.value)}
                placeholder={getPlaceholderForCollection(selectedCollection)}
                rows={15}
                className={styles.jsonEditor}
              />
              <div className={styles.formActions}>
                <button onClick={handleAdd}>Add Document</button>
                <button onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </div>
          )}

          {loading ? (
            <div className={styles.loading}>Loading documents...</div>
          ) : (
            <div className={styles.documentsGrid}>
              {documents.length === 0 ? (
                <p>No documents found in this collection.</p>
              ) : (
                documents.map((doc, index) => (
                  <div key={doc._id || index} className={styles.documentCard}>
                    <div className={styles.documentHeader}>
                      <span>Document {index + 1}</span>
                      <div className={styles.documentActions}>
                        <button 
                          onClick={() => setEditingDoc(editingDoc?._id === doc._id ? null : doc)}
                          className={styles.editButton}
                        >
                          {editingDoc?._id === doc._id ? 'Cancel' : 'Edit'}
                        </button>
                        <button 
                          onClick={() => handleDelete(doc)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {editingDoc?._id === doc._id ? (
                      <EditForm 
                        doc={editingDoc!} 
                        onSave={handleUpdate} 
                        onChange={setEditingDoc}
                      />
                    ) : (
                      <div className={styles.documentContent}>
                        {Object.entries(doc).map(([key, value]) => (
                          <div key={key} className={styles.field}>
                            <strong>{key}:</strong> 
                            <span className={styles.value}>
                              {formatValue(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface EditFormProps {
  doc: Document;
  onSave: (doc: Document) => void;
  onChange: (doc: Document) => void;
}

function EditForm({ doc, onSave, onChange }: EditFormProps) {
  const handleFieldChange = (key: string, value: string) => {
    const originalType = typeof doc[key];
    const parsedValue = parseValue(value, originalType);
    onChange({ ...doc, [key]: parsedValue });
  };

  const parseValue = (value: string, originalType: string): any => {
    if (originalType === 'object') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    if (originalType === 'number') {
      const num = Number(value);
      return isNaN(num) ? value : num;
    }
    if (originalType === 'boolean') {
      return value === 'true';
    }
    return value;
  };

  const formatValue = (value: any): string => {
    return safeStringify(value);
  };

  // Helper to handle array field changes
  const handleArrayChange = (key: string, index: number, newValue: string) => {
    const arr = Array.isArray(doc[key]) ? [...doc[key]] : [];
    arr[index] = newValue;
    onChange({ ...doc, [key]: arr });
  };

  const handleAddToArray = (key: string) => {
    const arr = Array.isArray(doc[key]) ? [...doc[key]] : [];
    arr.push("");
    onChange({ ...doc, [key]: arr });
  };

  const handleRemoveFromArray = (key: string, index: number) => {
    const arr = Array.isArray(doc[key]) ? [...doc[key]] : [];
    arr.splice(index, 1);
    onChange({ ...doc, [key]: arr });
  };

  return (
    <div className={styles.editForm}>
      {Object.entries(doc).map(([key, value]) => (
        <div key={key} className={styles.editField}>
          <label>{key}:</label>
          {key === '_id' ? (
            <input type="text" value={String(value)} disabled />
          ) : Array.isArray(value) ? (
            <div>
              {value.map((item, idx) => (
                typeof item === 'object' && item !== null ? (
                  <div key={idx} style={{ border: '1px solid #ccc', padding: 8, marginBottom: 8, borderRadius: 4 }}>
                    {Object.entries(item).map(([propKey, propValue]) => (
                      <div key={propKey} style={{ marginBottom: 4 }}>
                        <label style={{ marginRight: 4 }}>{propKey}:</label>
                        <input
                          type="text"
                          value={String(propValue)}
                          onChange={e => {
                            const arr = Array.isArray(doc[key]) ? [...doc[key]] : [];
                            arr[idx] = { ...arr[idx], [propKey]: e.target.value };
                            onChange({ ...doc, [key]: arr });
                          }}
                          style={{ marginRight: 8 }}
                        />
                      </div>
                    ))}
                    <button type="button" onClick={() => handleRemoveFromArray(key, idx)} style={{ marginTop: 4 }}>Remove</button>
                  </div>
                ) : (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                    <input
                      type="text"
                      value={item}
                      onChange={e => handleArrayChange(key, idx, e.target.value)}
                      style={{ marginRight: 8 }}
                    />
                    <button type="button" onClick={() => handleRemoveFromArray(key, idx)} style={{ marginRight: 4 }}>Remove</button>
                  </div>
                )
              ))}
              <button type="button" onClick={() => handleAddToArray(key)}>
                Add {Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' ? 'Object' : 'Item'}
              </button>
            </div>
          ) : typeof value === 'object' ? (
            <textarea
              value={formatValue(value)}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              rows={3}
            />
          ) : (
            <input
              type="text"
              value={formatValue(value)}
              onChange={(e) => handleFieldChange(key, e.target.value)}
            />
          )}
        </div>
      ))}
      <div className={styles.editActions}>
        <button onClick={() => onSave(doc)}>Save Changes</button>
      </div>
    </div>
  );
}
