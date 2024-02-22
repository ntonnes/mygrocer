-- loaddata.sql

-- Insert users
INSERT INTO Users (email, password) VALUES ('noah.tonnesen@gmail.com', 'testpass');
INSERT INTO Users (email, password) VALUES ('user2@example.com', 'password2');

-- Insert preferences
INSERT INTO Preferences (user_id, theme) VALUES (1, 'dark');
INSERT INTO Preferences (user_id, theme) VALUES (2, 'light');

-- Insert sessions
INSERT INTO Sessions (user_id, token) VALUES (1, 'token1');
INSERT INTO Sessions (user_id, token) VALUES (2, 'token2');

-- Insert recipes
INSERT INTO Recipes (user_id, name, made_before, rating) VALUES (1, 'Recipe 1', true, 5);
INSERT INTO Recipes (user_id, name, made_before, rating) VALUES (2, 'Recipe 2', false, 4);

-- Insert ingredients
INSERT INTO Ingredients (name, unit) VALUES ('Ingredient 1', 'oz');
INSERT INTO Ingredients (name, unit) VALUES ('Ingredient 2', 'lbs');

-- Insert recipe_ingredients
INSERT INTO RecipeIngredients (recipe_id, ingredient_id, amount) VALUES (1, 1, 2.5);
INSERT INTO RecipeIngredients (recipe_id, ingredient_id, amount) VALUES (2, 2, 1.5);

-- Insert pantry
INSERT INTO Pantry (user_id, ingredient_id, amount) VALUES (1, 1, 2);
INSERT INTO Pantry (user_id, ingredient_id, amount) VALUES (2, 2, 3);

-- Insert calendar_events
INSERT INTO CalendarEvents (user_id, recipe_id, event_time) VALUES (1, 1, '2022-12-01 12:00:00');
INSERT INTO CalendarEvents (user_id, recipe_id, event_time) VALUES (2, 2, '2022-12-02 12:00:00');