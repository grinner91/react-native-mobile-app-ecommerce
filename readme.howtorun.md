###  1. How to run backend API server ( Node.js, Expressjs, and Mongodb )

1.1 to install all the npm dependecies, run the following commands in terminal

1.2. Open VS Code and rest api project directory

1.3.  Run terminal on that directory then

1.4. command in termnal: npm install
1.5. update mongodb connection URL in the file
 // const MONGODB_URI = "mongodb://localhost:32768";
 //comment test data insertion, if necessary or every time it will clean and insert new data
//
in App.js file
//
clearAllTestData().then((res) => {
insertTestAllData();
});

1.6. nodemon App.js

1.7. That's all done :)


### 2. How to run mobile client app

2.1. Open VS Code and mobile app project directory

2.3  Run terminal on that directory

2.4. command in terminal: npm install
2.5. update backend API baseURL in the file
//
in services/base.http.js file
//
//export const baseUrl = "http://localhost:3000";
//export const baseUrl = "http://172.17.141.117:3000";

2.6. command in terminal: expo start --clear
2.7. That's all 



Screenshots: 
https://github.com/maharishi-university/extra-project-grinner91/blob/main/UI_screenshots/1.products_list_customer_ui.jpg


https://github.com/maharishi-university/extra-project-grinner91/blob/main/UI_screenshots/2.shopping_cart.jpg

https://github.com/maharishi-university/extra-project-grinner91/blob/main/UI_screenshots/3.myorders_list_customer_ui.jpg



