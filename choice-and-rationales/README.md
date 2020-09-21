# Choices & Rationales

### Assumption:

I have coded the application with a perspective that this is just a first epic of the project. 
i.e. there will be changes like more complex API requirements, more data sources will be upcoming. 

So there are few more libraries than currently it needs.

### Rationales:
#### 1. Http Framework
I am using ExpressJS with an additional layer of a library called as [routing-controllers](https://github.com/typestack/routing-controllers) from typestack.

It makes our work easy, since it has built in support for *Validation* (with the help of class-validator) and binding it to the DTOs with (class-transformer) and built in support for *typedi* for *IOC* control. 

#### 2. Implementation of Domain layer
Generally I prefer doing business rule validations in the Domain layer, having specific domain types, and relevant Value objects. 
But since, the application currently is fairly simple, it didn't make sense to add another layer of abstraction.

#### 3. Code Organization
I have tried to follow Hexagonal architecture with as specified above doesn't have a domain layer. 
But let's say if this application's Business domain gets more complex in that case it is fairly simple change to do.

Besides in the infrastructure I have implemented different ports in different folders i.e. the http port lies in the http folder, whereas in service the different Supplier API bridges are added to different folders.

Currently, for the different Supplier APIs I have done different classes, and I would say that the code is replicated for parts; but I have done this with a perspective of segregation expecting in a real world scenario the suppliers will have different kinds of APIs, responses and constraints.

#### 4. Dependency Injections
In general I use dependency injections for easy modifiability and testability. 
But since the application is simple, right now it didn't make sense to do dependency injections.
Nevertheless, I have kept the major parts (FlightService) injectable. 
So, lets say the application gets more difficult, it is easy to add the Dependency Injection.

#### 5. Automation Testing: 
I have tried to add unit tests for the major logical parts of the application.

#### 6. Authorization key: 
Currently, I am reading the Authorization key from the environment variables.

#### 7. Webpack: 
I am compiling the code, using webpack since the initial plan was to deploy the things in the Lamda. Where webpack would help us generate single minified file to be deployed on the Lambda with only the relevant code to be deployed. Also, it offers an easy solution of the case of handling the paths for module resolution.

#### 8. Error types
In a production quality code, I would implement Custom error types for different scenarios. 
But for the purpose of this as a coding assignment, I have not done so.

#### 9. Libraries used:
For **http communication:** I am using node-fetch since it is a lightweight library, and has frequent versions releases. 


#### 10. Validations
The validations have been implemented on the DTO but on the side of the Service Bridges i.e. the responses of the different suppliers will be validated for expected output. 

**Below are the Validation which have been done:** 
| Field | Validation | Error message |
| --- | --- | --- |
| originName | Should be a valid string | Invalid Origin name |
| destinationName | Should be a valid string  |  Invalid Destination name |
|departureUtc| Should be a valid date string| Invalid Departure date|
|arrivalUtc|Should be a vaild date string|Invalid Arrival date|
|flightNumber| Should be a valid string| Invalid Flight number|
|durationInMinutes| Should be a valid number| Invalid duration|
|price|Should be a valid number| Invalid price|

#### 11. Sample Output
The sample output from the API is: 
```json
[
    {
        "price": 130.1,
        "slices": [
            {
                "arrivalUTC": "2019-08-08T17:55:00.000Z",
                "departureUTC": "2019-08-08T16:00:00.000Z",
                "destinationName": "Stansted",
                "durationInMinutes": 115,
                "flightNumber": "146",
                "originName": "Schonefeld"
            },
            {
                "arrivalUTC": "2019-08-10T20:00:00.000Z",
                "departureUTC": "2019-08-10T18:00:00.000Z",
                "destinationName": "Schonefeld",
                "durationInMinutes": 120,
                "flightNumber": "8544",
                "originName": "Stansted"
            }
        ]
    }
```

