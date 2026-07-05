import { useState } from 'react';
import DictionaryTable from './components/DictionaryTable';
import MissingItems from './components/MissingItems';

function App() {
  const [activeTab, setActiveTab] = useState<'traits' | 'celebrations' | 'missing'>('traits');

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">RenderZ Metadata Admin</h1>
        <nav className="nav">
          <button 
            className={`nav-btn ${activeTab === 'traits' ? 'active' : ''}`}
            onClick={() => setActiveTab('traits')}
          >
            Traits Dictionary
          </button>
          <button 
            className={`nav-btn ${activeTab === 'celebrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('celebrations')}
          >
            Celebrations Dictionary
          </button>
          <button 
            className={`nav-btn ${activeTab === 'missing' ? 'active' : ''}`}
            onClick={() => setActiveTab('missing')}
          >
            Discovered Unknowns
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'traits' && <DictionaryTable type="traits" />}
        {activeTab === 'celebrations' && <DictionaryTable type="celebrations" />}
        {activeTab === 'missing' && <MissingItems />}
      </main>
    </div>
  );
}

export default App;
