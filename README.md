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

## Authenticating a Customer
A customer can login by supplying a username and password. The password is hashed and compared with the existing one (also hashed)
in the database. If it is a valid user, a token is generated, which is used for subsequents calls.

## Funding a Customer's account
A default account is created for every customer that registers on the platform.
When a user wants to add more money to their account, they make a request to the fund endoint and supply the amount they want to add.

The account holder details are gotten from the token in the header, and user's account balance and available balance are updated.

## Making a Widthrawal

