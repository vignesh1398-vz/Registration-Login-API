# Registration-Login-API
Steps to run the application:
  1. git clone https://github.com/vignesh1398-vz/Registration-Login-API
  2. cd backend
  3. npm install
  4. cd ..
  5. docker-compose up

### APIs used
  1. /api/user/signup  ->  For step 1 of the registration. (Name and Mobile).
  2. /api/user/:userId ->  For step 2, step 3 and to modify an existing user's record.
  3. /api/user/login   -> To login into the application.
  4. /api/user/:userId/logout -> To logout of the application.
