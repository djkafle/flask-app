CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
