-- createtbl.sql

-- Create users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create preferences table
CREATE TABLE Preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    theme VARCHAR(50) DEFAULT 'light',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create recipes table
CREATE TABLE Recipes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    name VARCHAR(255) NOT NULL,
    made_before BOOLEAN DEFAULT FALSE,
    rating INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ingredients table
CREATE TABLE Ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(50)
);

-- Create recipe_ingredients table
CREATE TABLE RecipeIngredients (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES Recipes(id),
    ingredient_id INTEGER REFERENCES Ingredients(id),
    amount DECIMAL NOT NULL
);

-- Create pantry table
CREATE TABLE Pantry (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    ingredient_id INTEGER REFERENCES Ingredients(id),
    amount DECIMAL NOT NULL
);

-- Create calendar_events table
CREATE TABLE CalendarEvents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    recipe_id INTEGER REFERENCES Recipes(id),
    event_time TIMESTAMP NOT NULL
);