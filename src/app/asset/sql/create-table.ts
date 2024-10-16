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
	    email VARCHAR(255) UNIQUE,
	    nickname VARCHAR(255) NOT NULL UNIQUE,
	    fullname VARCHAR(255) NOT NULL,
	    password VARCHAR(255) NOT NULL,
	    role_id INT NOT NULL,
	    agency_id INT NOT NULL,
	    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE RESTRICT,
	    FOREIGN KEY (agency_id) REFERENCES agency(id) ON DELETE RESTRICT
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
    
     CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        start INT NOT NULL,
        "end" INT NOT NULL,
        organization_id INT NOT NULL,
        name VARCHAR(255) NOT NULL
    );

    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM agency) THEN
            INSERT INTO agency (name) 
            VALUES ('Quan tri vien');
        END IF;
    END $$;


    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM role) THEN
            INSERT INTO role (name) 
            VALUES ('Admin');
        END IF;
    END $$;

        DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM users) THEN
            INSERT INTO users (email, nickname, fullname, password, role_id, agencyid) 
            VALUES ('admin@gmail.com', 'admin', 'admin', '111111', 1, 1);
        END IF;
    END $$;
`;
