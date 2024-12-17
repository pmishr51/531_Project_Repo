Setup Instructions:-

Front End (React):
1.Open a new terminal window.
2.Navigate to the root directory of the project (if not already there).
3.Execute the following commands in sequence:
-npm install: This command installs all the necessary dependencies listed in the package.json file for the frontend application.
-cd frontend: Navigate to the frontend directory where the React application resides.
-npm start: Starts the React development server. Once started, the frontend will be accessible via your browser at http://localhost:3000.

Back End (Node.js):
1.Open a new terminal window separate from the one used for the frontend.
2.Navigate to the root directory of the project (if not already there).
3.Execute the following commands in sequence:
-npm install: This command installs all the necessary dependencies listed in the
-package.json file for the backend application.
-npm run dev: Runs the backend server in development mode using tools like nodemon, which automatically restarts the server on code -changes. The backend will be accessible at http://localhost:5000.

GraphDB Repository:
Create a Repository Locally:
-Open your GraphDB instance (accessible via a browser at http://localhost:7200).
-Log in and create a new repository. Provide a name and configuration settings as required.
Import OWL and TTL Files:
-Use the "Import" option in GraphDB to upload the provided .owl and .ttl files. These files define the ontology and data for your repository.
Run the Repository:
-After importing, ensure the repository is running. You can check the repository status in the GraphDB interface.
Edit Environment Variables:
-Locate the .env file in the project root directory.
-Update the SPARQL_ENDPOINT_URL or equivalent variable to point to the local repository’s SPARQL querying endpoint.
-Save the changes to the .env file.
Access Points:
-Frontend: The React application will be accessible at http://localhost:3000.
-Backend: The Node.js server will be accessible at http://localhost:5000.
-GraphDB: The GraphDB workbench will be accessible at http://localhost:7200. Use this to manage repositories, run SPARQL queries, and verify data.
Summary
These instructions will set up the frontend, backend, and GraphDB repository for this project. Make sure each component runs in its respective terminal or window and test the connections between them (e.g., 
frontend fetching data from the backend, and backend querying the GraphDB repository).




Youtube Link :
https://youtu.be/0EJbRFHrsvY

