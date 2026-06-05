const fs = require('fs');
const path = 'C:/project-files/Zenith-app-Max/app/components/PlayerDetailContent.client.js';

let c = fs.readFileSync(path, 'utf8');

// 1. Prevent State Reset on Rank Change: 
// Only reset the record state if the PLAYER ID actually changes.
const oldEffect = /useEffect\(\(\) => \{[\s\S]*?setRecord\(initialRecord\);[\s\S]*?setSelectedRank\(parseRank\(initialRank\)\);[\s\S]*?\}, \[initialRecord, initialRank\]\);/;

const newEffect = `  const lastProcessedPlayerId = useRef(String(initialRecord?.playerId || ''));

  useEffect(() => {
    const nextPlayerId = String(initialRecord?.playerId || '');
    const isSamePlayer = lastProcessedPlayerId.current === nextPlayerId;
    lastProcessedPlayerId.current = nextPlayerId;

    if (!isSamePlayer) {
        setRecord(initialRecord);
        setSelectedRank(parseRank(initialRank));
        setIsRankLoading(false);
    }
    
    requestSequenceRef.current += 1;
    if (requestControllerRef.current) {
      requestControllerRef.current.abort();
      requestControllerRef.current = null;
    }
  }, [initialRecord, initialRank]);`;

if (c.includes('setRecord(initialRecord);')) {
    c = c.replace(oldEffect, newEffect);
    fs.writeFileSync(path, c, 'utf8');
    console.log('PlayerDetailContent.client.js patched to prevent state reset on rank change.');
} else {
    console.log('Could not find reset effect');
}
