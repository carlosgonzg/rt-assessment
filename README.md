# rt-assessment
## By Carlos Gonzalez

### Explanation of the file structure
This repository is divided in three big parts
- **backend:** This is the backend of the project, here I'm mocking data and doing procedural generation to add random data, the backend is made on **C#**
- **frontend:** This is the frontend of the project, is made with Reach, for the design I used different libraries like:
  - MUI: For components like dialogs, inputs
  - Tailwind CSS: For styling, grids and responsiveness
  - Axios: For making http requests
- **docker:** In order to make this project easy to use and deploy, I created two **Dockerfile**, each one in their project, and then a **docker-compose.yml** file, with this you can just run the command 
```sh
docker-compose up --build
```
And it will run the project and set up everything

### What if you want to run the projects separately?
**You need Node.js v18 and dotnet in order to run the projects**
- In two different terminals, open each project (backend and frontend)
  - ```cd backend```
  - ```cd frontend```
- For **backend**:
  - ```dotnet restore```
  - ```dotnet publish -c debug -o ./app --no-restore```
  - ```dotnet backend.dll --urls http://+:5129```
- For **frontend**:
  - ```npm install```
  - ```npm run dev```
