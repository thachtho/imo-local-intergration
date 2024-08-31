export const createTableQuery = `
    CREATE TABLE IF NOT EXISTS agency (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS role (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        nickname VARCHAR(255) NOT NULL,
        fullname VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role_id INT NOT NULL,
        agencyId INT NOT NULL,
        FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE RESTRICT,
        FOREIGN KEY (agencyId) REFERENCES agency(id) ON DELETE RESTRICT
    );

    CREATE TABLE IF NOT EXISTS control (
        id SERIAL PRIMARY KEY,
        parent_id INT,
        path VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS role_control (
        id SERIAL PRIMARY KEY,
        role_id INT NOT NULL,
        control_id INT NOT NULL,
        FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
        FOREIGN KEY (control_id) REFERENCES control(id) ON DELETE CASCADE,
        UNIQUE (role_id, control_id)
    );
`;
