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

interface Skill {
  name: string;
  level: number;
}

interface Project {
  id?: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface PersonalInfo {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
}

export default function CrudManager({ token }: CrudManagerProps) {
  const [collections, setCollections] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  // Remove unused newDoc state and related functions since we're not using JSON anymore
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      setError('');
      setSuccess('');
      setShowAddForm(false);
      setEditingDoc(null);
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
      setError('');
      setSuccess('');
      
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
        setSuccess('Document updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Update failed');
      }
    } catch (err) {
      setError('Failed to update document');
    }
  };

  const handleAdd = async (documentData: any) => {
    try {
      setError('');
      setSuccess('');
      
      const response = await fetch(`/api/admin/${selectedCollection}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(documentData),
      });

      if (response.ok) {
        await fetchDocuments();
        setShowAddForm(false);
        setSuccess('Document added successfully!');
        setTimeout(() => setSuccess(''), 3000); // Clear success message after 3 seconds
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

  const getEmptyDocument = (collectionName: string): any => {
    switch (collectionName.toLowerCase()) {
      case 'projects':
        return {
          title: '',
          description: '',
          technologies: [],
          githubUrl: '',
          liveUrl: ''
        };
      case 'skills':
        return {
          category: '',
          skills: []
        };
      case 'info':
        return {
          name: '',
          email: '',
          phone: '',
          location: '',
          bio: ''
        };
      default:
        return {};
    }
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
  "liveUrl": "https://example.com"
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
      {success && <div className={styles.success}>{success}</div>}

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
            <AddDocumentForm 
              collection={selectedCollection}
              onAdd={handleAdd}
              onCancel={() => setShowAddForm(false)}
            />
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
                        collection={selectedCollection}
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
  collection: string;
  onSave: (doc: Document) => void;
  onChange: (doc: Document) => void;
}

// Add Document Form Component
interface AddDocumentFormProps {
  collection: string;
  onAdd: (doc: any) => void;
  onCancel: () => void;
}

function AddDocumentForm({ collection, onAdd, onCancel }: AddDocumentFormProps) {
  const [formData, setFormData] = useState<any>(() => {
    const collectionLower = collection.toLowerCase();
    switch (collectionLower) {
      case 'projects':
      case 'project':
        return {
          title: '',
          description: '',
          technologies: [],
          githubUrl: '',
          liveUrl: ''
        };
      case 'skills':
      case 'skill':
        return {
          category: '',
          skills: []
        };
      case 'info':
        return {
          name: '',
          email: '',
          phone: '',
          location: '',
          bio: ''
        };
      default:
        return {};
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const collectionLower = collection.toLowerCase();
    
    // Basic validation
    if (collectionLower === 'projects' || collectionLower === 'project') {
      if (!formData.title?.trim() || !formData.description?.trim()) {
        alert('Title and description are required for projects');
        return;
      }
    } else if (collectionLower === 'skills' || collectionLower === 'skill') {
      if (!formData.category?.trim()) {
        alert('Category is required for skills');
        return;
      }
      if (!formData.skills || formData.skills.length === 0) {
        alert('At least one skill is required');
        return;
      }
      // Validate skills
      for (let i = 0; i < formData.skills.length; i++) {
        const skill = formData.skills[i];
        if (!skill.name?.trim()) {
          alert(`Skill name is required for skill ${i + 1}`);
          return;
        }
        if (!skill.level || skill.level < 1 || skill.level > 100) {
          alert(`Skill level must be between 1-100 for skill ${i + 1}`);
          return;
        }
      }
    }
    
    onAdd(formData);
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addToArray = (field: string) => {
    const currentArray = formData[field] || [];
    setFormData({ ...formData, [field]: [...currentArray, ''] });
  };

  const removeFromArray = (field: string, index: number) => {
    const newArray = (formData[field] || []).filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSkillChange = (index: number, field: 'name' | 'level', value: string | number) => {
    const newSkills = [...(formData.skills || [])];
    if (!newSkills[index]) {
      newSkills[index] = { name: '', level: 0 };
    }
    newSkills[index] = { ...newSkills[index], [field]: value };
    setFormData({ ...formData, skills: newSkills });
  };

  const addSkill = () => {
    const currentSkills = formData.skills || [];
    setFormData({ 
      ...formData, 
      skills: [...currentSkills, { name: '', level: 0 }] 
    });
  };

  const removeSkill = (index: number) => {
    const newSkills = (formData.skills || []).filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const renderProjectForm = () => (
    <>
      <div className={styles.editField}>
        <label>Title:</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter project title"
          required
        />
      </div>
      <div className={styles.editField}>
        <label>Description:</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          placeholder="Describe your project"
          required
        />
      </div>
      <div className={styles.editField}>
        <label>Technologies:</label>
        {(formData.technologies || []).map((tech: string, index: number) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <input
              type="text"
              value={tech}
              onChange={(e) => handleArrayChange('technologies', index, e.target.value)}
              style={{ marginRight: '0.5rem', flex: 1 }}
              placeholder="Enter technology name"
            />
            <button type="button" onClick={() => removeFromArray('technologies', index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addToArray('technologies')}>Add Technology</button>
      </div>
      <div className={styles.editField}>
        <label>GitHub URL:</label>
        <input
          type="url"
          value={formData.githubUrl || ''}
          onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
          placeholder="https://github.com/username/repo"
        />
      </div>
      <div className={styles.editField}>
        <label>Live URL:</label>
        <input
          type="url"
          value={formData.liveUrl || ''}
          onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
          placeholder="https://your-project.com"
        />
      </div>
    </>
  );

  const renderSkillsForm = () => (
    <>
      <div className={styles.editField}>
        <label>Category:</label>
        <input
          type="text"
          value={formData.category || ''}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="e.g., Frontend, Backend, Tools"
          required
        />
      </div>
      <div className={styles.editField}>
        <label>Skills:</label>
        {(formData.skills || []).map((skill: Skill, index: number) => (
          <div key={index} style={{ 
            border: '1px solid rgba(255, 255, 255, 0.3)', 
            padding: '1rem', 
            marginBottom: '0.5rem', 
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
              <div style={{ flex: 2 }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Skill Name:</label>
                <input
                  type="text"
                  value={skill.name || ''}
                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                  placeholder="e.g., React"
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Level (1-100):</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={skill.level || 0}
                  onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value) || 0)}
                  required
                />
              </div>
            </div>
            <button type="button" onClick={() => removeSkill(index)}>Remove Skill</button>
          </div>
        ))}
        <button type="button" onClick={addSkill}>Add Skill</button>
      </div>
    </>
  );

  const renderInfoForm = () => (
    <>
      <div className={styles.editField}>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your full name"
        />
      </div>
      <div className={styles.editField}>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your.email@example.com"
        />
      </div>
      <div className={styles.editField}>
        <label>Phone:</label>
        <input
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div className={styles.editField}>
        <label>Location:</label>
        <input
          type="text"
          value={formData.location || ''}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="City, State/Country"
        />
      </div>
      <div className={styles.editField}>
        <label>Bio:</label>
        <textarea
          value={formData.bio || ''}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          placeholder="Tell us about yourself..."
        />
      </div>
    </>
  );

  return (
    <div className={styles.addForm}>
      <h3>Add New {collection.charAt(0).toUpperCase() + collection.slice(1)} Document</h3>
      <form onSubmit={handleSubmit}>
        {(collection.toLowerCase() === 'projects' || collection.toLowerCase() === 'project') && renderProjectForm()}
        {(collection.toLowerCase() === 'skills' || collection.toLowerCase() === 'skill') && renderSkillsForm()}
        {collection.toLowerCase() === 'info' && renderInfoForm()}
        
        <div className={styles.formActions}>
          <button type="submit">Add Document</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

function EditForm({ doc, collection, onSave, onChange }: EditFormProps) {
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

  const handleSkillChange = (skillIndex: number, field: 'name' | 'level', value: string | number) => {
    const skills = Array.isArray(doc.skills) ? [...doc.skills] : [];
    if (skills[skillIndex]) {
      skills[skillIndex] = { ...skills[skillIndex], [field]: value };
      onChange({ ...doc, skills });
    }
  };

  const addSkill = () => {
    const skills = Array.isArray(doc.skills) ? [...doc.skills] : [];
    skills.push({ name: '', level: 0 });
    onChange({ ...doc, skills });
  };

  const removeSkill = (index: number) => {
    const skills = Array.isArray(doc.skills) ? [...doc.skills] : [];
    skills.splice(index, 1);
    onChange({ ...doc, skills });
  };

  const renderSkillsEdit = (skills: Skill[]) => (
    <div>
      {skills.map((skill, idx) => (
        <div key={idx} style={{ 
          border: '1px solid rgba(255, 255, 255, 0.3)', 
          padding: '1rem', 
          marginBottom: '0.5rem', 
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ flex: 2 }}>
              <label style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Skill Name:</label>
              <input
                type="text"
                value={skill.name || ''}
                onChange={e => handleSkillChange(idx, 'name', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Level (1-100):</label>
              <input
                type="number"
                min="1"
                max="100"
                value={skill.level || 0}
                onChange={e => handleSkillChange(idx, 'level', parseInt(e.target.value) || 0)}
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <button type="button" onClick={() => removeSkill(idx)}>Remove Skill</button>
        </div>
      ))}
      <button type="button" onClick={addSkill}>Add Skill</button>
    </div>
  );

  return (
    <div className={styles.editForm}>
      {Object.entries(doc).map(([key, value]) => (
        <div key={key} className={styles.editField}>
          <label>{key}:</label>
          {key === '_id' ? (
            <input type="text" value={String(value)} disabled />
          ) : key === 'skills' && collection.toLowerCase() === 'skills' && Array.isArray(value) ? (
            renderSkillsEdit(value)
          ) : key === 'technologies' && Array.isArray(value) ? (
            <div>
              {value.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                  <input
                    type="text"
                    value={item}
                    onChange={e => handleArrayChange(key, idx, e.target.value)}
                    style={{ marginRight: 8, flex: 1 }}
                  />
                  <button type="button" onClick={() => handleRemoveFromArray(key, idx)}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddToArray(key)}>Add Technology</button>
            </div>
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
