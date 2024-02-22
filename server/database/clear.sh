#!/bin/bash

# Get the directory of the current script
DIR="$(dirname "$0")"

# Load the environment variables
source $DIR/../.env.local

# Connect to the database and run the SQL commands from createtbl.sql
PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$DIR/droptbl.sql" 