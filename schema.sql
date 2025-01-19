-- Add this table to your existing schema
CREATE TABLE support_staff (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  picture_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modify the tickets table to include assigned_to
ALTER TABLE tickets
ADD COLUMN assigned_to VARCHAR(36),
ADD FOREIGN KEY (assigned_to) REFERENCES support_staff(id);

