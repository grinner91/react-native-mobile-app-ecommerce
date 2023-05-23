###  1. How to run backend API server ( Node.js, Expressjs, and Mongodb )

-> to install all the npm dependecies, run the following commands in terminal

-> Open VS Code and rest api project directory

->  Run terminal on that directory then

1.1. npm install
1.2. update mongodb connection URL in the file

->  const MONGODB_URI = "mongodb://localhost:32768";

->  comment test data insertion, if necessary or every time it will clean and insert new data

//
in App.js file
//
clearAllTestData().then((res) => {
insertTestAllData();
});

1.2. nodemon App.js

1.3. That's all done :)

### 2. How to run mobile client app

->  Open VS Code and mobile app project directory

->  Run terminal on that directory

2.1.command in terminal: npm install
2.2.update backend API baseURL in the file
//
in services/base.http.js file
//
//export const baseUrl = "http://localhost:3000";
//export const baseUrl = "http://172.17.141.117:3000";

2.3.command in terminal: expo start --clear
