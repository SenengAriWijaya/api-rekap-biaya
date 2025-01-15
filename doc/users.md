# User API Spec

## Register User API

Endpoint : POST /api/users/register

Request Body : 

``` Json
{
    "username": "admin123",
    "password": "123",
    "name": "admin"
}
````

Response Body Success : 

``` JSON 
{
    "status": "Success",
    "data": {
        "username": "admin123",
        "password": "123",
        "name": "admin"
    },
    "message": "created account successfully",
}
```

Response Body Error : 

``` JSON
{
    "status": "Error",
    "message": "username already exists",
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

``` JSON 
{
    "username": "ari123",
    "password": "123",
}
```

Response Body Success : 

``` JSON 
{
    "status": "Success",
    "data": {
        "username": "ari123",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5c",
        "refreshToken": "sakldjh29jkr2jjakdljalkd",
    },
    "message": "logged in successfully",
}
```

Response Body Erorr : 
``` JSON
{
    "status": "Erorr",
    "message": "invalid username or password",
}

