#!/bin/bash

# Configuration variables
DB_NAME="note_db"
DB_USER="root"
DB_PASSWORD="123456"

# Paths to backend and frontend directories
BACKEND_DIR="./backend"
FRONTEND_DIR="./frontend"

# Start message
echo "Starting application setup"

# Create MySQL database if it doesn't exist
echo "Setting up database"
mysql -u $DB_USER -p$DB_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

# Start backend (Spring Boot)
echo "Installing backend dependencies"
cd $BACKEND_DIR
./mvnw clean install

echo "Starting backend"
./mvnw spring-boot:run &

# Wait for backend to start
sleep 15

# Start frontend (React)
echo "Installing frontend dependencies"
cd ../$FRONTEND_DIR
npm install

echo "Starting frontend"
npm start &

# Wait for frontend to start
sleep 5

# Success message
echo "Application setup complete. Backend running on port 8080, frontend running on port 3000."