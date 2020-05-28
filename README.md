-------------------------------------------------------------------------------------
Task Management Application - React
-------------------------------------------------------------------------------------
![alt](https://i.ibb.co/DV25MsF/screenshot.jpg) 

# Packages used 
npm install --save react react-dom react-redux react-router-dom redux-logger

# Todo

npm install --save react-bootstrap bootstrap

npm install @material-ui/core
npm install @material-ui/icons


npm install --save react-saga

# Todo
- Use Typescript

--------------------------------------------------------------------------------------

# Structure 

- src
    - Components
        App

    - Helper
        

    - Pages
        
        Login
        Register
        Dashboard

    - Redux
        - Store
        - Reducers
        - Actions

    - Services
        User
        Todo


- index.js

# Deploy

  - npm run build
  - heroku create dev-todo-react-app --buildpack mars/create-react-app
  - git push heroku master
  - heroku open
