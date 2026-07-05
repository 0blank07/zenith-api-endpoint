import { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle } from 'lucide-react';

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

  if (loading) return <div>Loading missing metadata...</div>;

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--danger)' }}>
        <AlertCircle size={24} />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Unmapped IDs Discovered</h2>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
