import { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

interface MissingItem {
  id: number;
  asset_id: number | null;
  type: string;
  unknown_id: number;
  created_at: string;
}

export default function MissingItems() {
  const [items, setItems] = useState<MissingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [rescanning, setRescanning] = useState(false);

  useEffect(() => {
    fetchMissing();
  }, []);

  const fetchMissing = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/missing');
      setItems(res.data);
    } catch (error) {
      console.error('Failed to fetch missing metadata:', error);
    }
    setLoading(false);
  };

  const handleMarkAsDone = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/missing/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to mark as done:', error);
      alert('Failed to delete.');
    }
  };

  const handleRescan = async () => {
    setRescanning(true);
    try {
      const res = await axios.post('http://localhost:3001/api/missing/rescan');
      alert(`Rescan complete! Cleaned up ${res.data.deletedCount} items that were already mapped.`);
      await fetchMissing();
    } catch (error) {
      console.error('Failed to rescan:', error);
      alert('Failed to rescan.');
    }
    setRescanning(false);
  };

  if (loading) return <div>Loading missing metadata...</div>;

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
          <AlertCircle size={24} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Unmapped IDs Discovered</h2>
        </div>
        <button 
          className="btn" 
          onClick={handleRescan} 
          disabled={rescanning}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <RefreshCw size={16} className={rescanning ? 'spin' : ''} />
          {rescanning ? 'Scanning...' : 'Rescan & Clean'}
        </button>
      </div>
      
      {items.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--success)' }}>
          No missing metadata found! Your database is perfectly synced.
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Missing ID</th>
                <th>Found on Player (Asset ID)</th>
                <th>Date Discovered</th>
                <th style={{ width: '120px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <span className="missing-badge">{item.type.toUpperCase()}</span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{item.unknown_id}</td>
                  <td>{item.asset_id || 'N/A'}</td>
                  <td style={{ color: 'var(--text-muted)' }}>
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td>
                    <button 
                      className="icon-btn" 
                      title="Mark as Done"
                      onClick={() => handleMarkAsDone(item.id)}
                      style={{ color: 'var(--success)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                      <CheckCircle size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
