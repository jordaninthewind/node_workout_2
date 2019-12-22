## EPAM Node.js Task 2

This application is a backend, in memory user generator.

Using Postman or another request generator, a user can communicate with endpoints to create users with Login, Password (stored in plaintext), and age. Each user is assigned a unique identifier when created.

### Getting Started
To run the repo, clone locally. Install all dependencies using 'npm install'. Run the server by using the command 'npm run start'.

## Endpoints
The repo is RESTful and follows standard RESTful syntax for CRUD operations.

### The endpoints are as follows:

##### GET /users
    - Will return all user instances
##### PUT /users/:id
    - Will update user by internal ID
    - Requires 'login', 'password', and 'age' as query strings
##### DELETE /users/:id
    - Will delete user with the param :id
##### GET /users/:id
    - Will return the user with the param :id
##### POST /users
    - Will create a new user
    - Requires 'login', 'password', and 'age' as query strings
##### GET /search/:substring?limit={desired number of returned users}
    - Returns users that match the :substring as a regex
