import { useState, useEffect } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';

interface DictionaryItem {
  id: number;
  name: string;
}

export default function DictionaryTable({ type }: { type: 'traits' | 'celebrations' | 'nations' | 'clubs' | 'leagues' }) {
  const [items, setItems] = useState<DictionaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [toast, setToast] = useState('');
  
  // For new traits
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [type]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3001/api/${type}`);
      setItems(res.data);
    } catch (error) {
      console.error(`Failed to fetch ${type}:`, error);
    }
    setLoading(false);
  };

  const handleSave = async (id: number, newNameVal: string, oldNameVal: string) => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const res = await axios.post(`http://localhost:3001/api/${type}`, { 
        id, 
        name: newNameVal,
        oldName: oldNameVal
      });
      setToast(`${type.charAt(0).toUpperCase() + type.slice(1)} updated! Healed ${res.data.healedCount || 0} cards.`);
      setTimeout(() => setToast(''), 4000);
      setEditId(null);
      fetchItems();
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save. Check console.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNew = async () => {
    if (!newId || !newName) return;
    await handleSave(parseInt(newId), newName, '');
    setNewId('');
    setNewName('');
  };

  const filtered = items.filter(
    item => item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toString().includes(search)
  );

  return (
    <div className="card">
      <div className="search-bar">
        <input 
          type="text" 
          className="input-field" 
          placeholder={`Search ${type}...`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      
      <div className="search-bar" style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.5rem' }}>
        <input 
          type="number" 
          className="input-field" 
          placeholder="New ID"
          value={newId}
          onChange={e => setNewId(e.target.value)}
          style={{ width: '120px' }}
        />
        <input 
          type="text" 
          className="input-field" 
          placeholder="New Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <button className="btn" onClick={handleAddNew}>
          <Save size={18} /> Add New
        </button>
      </div>

      <div className="table-container">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th style={{ width: '100px' }}>ID</th>
                <th>Name</th>
                <th style={{ width: '150px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {editId === item.id ? (
                      <input 
                        type="text" 
                        className="input-field" 
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <span style={{ fontWeight: 500 }}>{item.name}</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {editId === item.id ? (
                      <button className="btn" onClick={() => handleSave(item.id, editName, item.name)}>
                        <Save size={16} /> Save
                      </button>
                    ) : (
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => { setEditId(item.id); setEditName(item.name); }}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
