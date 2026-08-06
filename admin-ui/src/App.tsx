import { useState } from 'react';
import DictionaryTable from './components/DictionaryTable';
import MissingItems from './components/MissingItems';

function App() {
  const [activeTab, setActiveTab] = useState<'traits' | 'celebrations' | 'nations' | 'clubs' | 'leagues' | 'missing'>('traits');

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">RenderZ Metadata Admin</h1>
        <nav className="nav" style={{ flexWrap: 'wrap' }}>
          <button 
            className={`nav-btn ${activeTab === 'traits' ? 'active' : ''}`}
            onClick={() => setActiveTab('traits')}
          >
            Traits
          </button>
          <button 
            className={`nav-btn ${activeTab === 'celebrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('celebrations')}
          >
            Celebrations
          </button>
          <button 
            className={`nav-btn ${activeTab === 'nations' ? 'active' : ''}`}
            onClick={() => setActiveTab('nations')}
          >
            Nations
          </button>
          <button 
            className={`nav-btn ${activeTab === 'clubs' ? 'active' : ''}`}
            onClick={() => setActiveTab('clubs')}
          >
            Clubs
          </button>
          <button 
            className={`nav-btn ${activeTab === 'leagues' ? 'active' : ''}`}
            onClick={() => setActiveTab('leagues')}
          >
            Leagues
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
        {activeTab === 'nations' && <DictionaryTable type="nations" />}
        {activeTab === 'clubs' && <DictionaryTable type="clubs" />}
        {activeTab === 'leagues' && <DictionaryTable type="leagues" />}
        {activeTab === 'missing' && <MissingItems />}
      </main>
    </div>
  );
}

export default App;
