# Note Taker Application

## Description
Note Taker is a web application that allows users to create, edit, delete, archive, unarchive, and filter notes by category. It is designed as a Single Page Application (SPA), using React.js for the frontend and Spring Boot for the backend. The backend exposes a REST API, and data is persisted in a MySQL database using Spring Data JPA (Hibernate) as the ORM layer.

## Technologies used
### Backend
- **Java**: 17
- **Spring Boot**: 3.3.2
- **Maven**: 3.8.6
- **MySQL**: 8.0

### Frontend
- **React**: 18.3.1
- **React Router DOM**: 6.26.0
- **Axios**: 1.7.4
- **Node.js**: 20.10.0

## Tools
- **IntelliJ IDEA** (for backend development)
- **Visual Studio Code** (for frontend development)

## Requirements
- **Java**: Version 17 or higher
- **Node.js**: Version 20.10.0 or higher
- **npm**: Version 10.2.3 or higher
- **MySQL**: Installed and running (version 8.0 or higher)
- **Maven**: Installed globally if you are not using the wrapper.
  
## Setup Instructions
### Clone the repository
```bash ```
1. git clone https://github.com/brenguardines/note-taker-app.git
2. cd note-taker-app
   
### Backend setup
1. Navigate to the backend directory:
    ```cd backend```
2. Install the backend dependencies using Maven:
    ```./mvnw clean install```
3. Configure the application.properties file located in src/main/resources/:
   - Ensure the database credentials match your MySQL setup:
    ```
    spring.datasource.url=jdbc:mysql://localhost:3306/note_db?useSSL=false&serverTimezone=UTC&useUnicode=true&characterEncoding=UTF-8
    spring.datasource.username=root
    spring.datasource.password=123456
    ```
4. Run the backend application:
    ```./mvnw spring-boot:run```

### Frontend setup
1. Navigate to the frontend directory:
    ```cd frontend```
2. Install the frontend dependencies using npm:
    ```npm install```
3. Start the frontend development server:
    ```npm start```

### Database setup
1. Ensure that MySQL is installed and running.
2. Create the database:
    ```mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS note_db;"```
3. Optionally, use the provided start.sh script to automatically set up the database:
    ```./start.sh```

## Running the Application
Once both the backend and frontend are running, you can access the application at 
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
  
## Using the Bash Script (Alternative Setup)
To set up the application automatically, you can use the included bash script. The script will set up the MySQL database, run the backend, and start the frontend server.
1. Make the script executable:
    ```chmod +x start.sh```
2. Run the script:
    ```./start.sh```

## API Endpoints
- GET `/api/notes`: Retrieve all notes
- GET `/api/notes/{id}`: Retrieve a note
- POST `/api/notes`: Create a new note
- PUT `/api/notes/{id}`: Update an existing note
- DELETE `/api/notes/{id}`: Delete a note
- GET `/api/notes/category`: Retrieve notes by category
- PUT `/api/notes/{id}/archive`: Archive a note
- PUT `/api/notes/{id}/unarchive`: Unarchive a note
- GET `/api/notes/active`: Retrieve all active (non-archived) notes
- GET `/api/notes/archive`: Retrieve all archived notes