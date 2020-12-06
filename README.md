# Flight Service
This service provides all the available flights data.

## Prerequisites
You will need to below dependencies for running this application: 
1. [install node.js](https://nodejs.org/en/download)
2. [docker-compose](https://docs.docker.com/compose/install/)

### Install dependencies

To install all dependencies run the following command:
```
npm install
```

### Create the .env file from .env.example
You would need to create a .env file for the application to run. 
You can directly copy the values from .env.example to a new .env file. 

You would need to replace the **CREDENTIALS** in the env file for both the suppliers.
Sorry for the tedious task.

### Starting application

Finally you can start the application server:

```
npm run start
```
This would be running based on docker-compose. So please install the docker-compose before running this.
This might take some time, since it would build the relevant dockers and start the application. 

You can also start the application without the Docker, then please use command:
```
npm run dev
```

This application is based on ExpressJS.

### For calling the service

For using the Service, please use the Postman request at [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/d1479969db36c715980d)

or use the exported [Postman collection](FlightService.postman_collection.json)

or you can use the below-given curl request:
```
curl --location --request GET 'http://localhost:8000/api/flights' \
--header 'Authorization:  Bearer 8xjM8PF9XC7KVUQ'
```

### Authorization

Currently the "Authorization" Token has been set in .env.example to 8xjM8PF9XC7KVUQ. 
So you would need to pass this as a header:
```
{"Authorization": "Bearer 8xjM8PF9XC7KVUQ"}
```

### Running Tests
You can run the tests with command: 
```
npm run test
```

You can also see the test coverage using: 
```
npm run test:coverage
```
I have tried to write tests to cover the Logical parts.

### Running linters
You can run the linters with command:
```
npm run lint
```


### Choices & Rationales
Please find the choices and rationales [here](choice-and-rationales/README.md)