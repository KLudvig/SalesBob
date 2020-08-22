# SalesBob

A lead generation bot for Staffing Agencies. Bob scrapes job boards to find matching clients and also reaches out to them. Created with React, Node.js and MongoDB. Because of GDPR this app can't be used.


## Install

First, install all dependencies. There are two package.json files, one for Frontend and one for Backend.

Install Backend dependencies:

```bash
yarn install
```

Install Fronted dependencies in the client folder:
```bash
cd client 
yarn install
```

Add your database in the .env_sample file, and rename the file to .env (example: 'mongodb://127.0.0.1:27017/bob')
```bash
MONGO_DB="YOUR_DATABASE_HERE"
```

## Run
Make sure mongoDB is running.

To start the server, open up the terminal, then type in:
```bash
nodemon server.js
```

Then start React. Open up a new terminal window. Go to the client folder and then type in:
```bash
cd client
yarn start
```
