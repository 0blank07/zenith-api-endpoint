CREATE TABLE IF NOT EXISTS traits_dictionary (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS celebrations_dictionary (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS missing_metadata (
    id SERIAL PRIMARY KEY,
    asset_id INT,
    type VARCHAR(50) NOT NULL,
    unknown_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(type, unknown_id)
);
