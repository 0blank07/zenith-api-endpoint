CREATE TABLE IF NOT EXISTS playstyles_catalog (
  playstyle_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon_level_1 VARCHAR(500),
  icon_level_2 VARCHAR(500),
  CONSTRAINT unq_playstyle_name UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS player_playstyles (
  player_id INTEGER,
  playstyle_name VARCHAR(255) REFERENCES playstyles_catalog(name) ON DELETE CASCADE,
  level INTEGER NOT NULL CHECK (level IN (1, 2)),
  PRIMARY KEY (player_id, playstyle_name)
);
