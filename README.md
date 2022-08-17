# lendsqr
![Alt text here](./Lendsqr.drawio.svg)

# Models in the Service
The different models that make up the system includes. 
* User Auth. 
* User
* Account
* Transaction

## Creating a Customer
When a request is made to create a customer, a user auth is created using the supplied email and password.
This is necessary in order to prevent pulling all user information from the database just for authentication.  

A EVENT.CUSTOMER.CREATED event is emitted once a user auth is successfully created for the customer.  
This is done in order to prevent the caller from waiting for too long.
The listener for the EVENT.CUSTOMER.CREATED event creates a default "account" for the customer, with zero balance.
