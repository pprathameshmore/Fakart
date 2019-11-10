![Icon](/assets/icons/fakart.jpg)
# Fakart
## Online Shopping Site Fake API
Online Shopping Site Fake RESTful API with MVC architecture
Implemented the most popular HTTP routes.

[![Build Status](https://travis-ci.com/pprathameshmore/Fakart.svg?branch=master)](https://travis-ci.com/pprathameshmore/Fakart)
![GitHub top language](https://img.shields.io/github/languages/top/pprathameshmore/fakart?style=flat)
![GitHub](https://img.shields.io/github/license/pprathameshmore/fakart?style=flat)
![GitHub last commit](https://img.shields.io/github/last-commit/pprathameshmore/fakart?style=flat)

## Table of Contents

### User routes
* [Sign up user](#get-a-random-quote).
* [Sign in user](#get-quotes-by-author).

### Product routes
* [Get all products](#get-all-quotes).
* [Get a single product](#get-all-quotes-by-keyword).
* [Get uploded photos](#get-all-quotes-by-keyword).
* [Products sorting](#get-all-quotes-by-keyword).
#### Protected routes
* [Add new product](#get-all-quotes-by-keyword).
* [Update product](#get-all-quotes-by-keyword).
* [Delete product](#get-all-quotes-by-keyword).

### Order routes
* [Get all orders](#get-all-quotes-by-keyword).
* [Get a single order](#get-all-quotes-by-keyword).
#### Protected routes
* [Add new order](#get-all-quotes-by-keyword).
* [Update new order](#get-all-quotes-by-keyword).
* [Delete new order](#get-all-quotes-by-keyword).

## API Documentation.

### Sign up user

Sign up for service

#### Request

``` http://localhost:5000/user/signup/ ```

``` 
Headers
Content-Type : application/json

HTTP method
POST
```
```javascript
{
    "email" : "test@test.com",
    "password" : "test"
}
```
#### Response

```javascript
{
    "message": "User created"
}
```

### Sign in user

Sign in for service

#### Request

``` http://localhost:5000/user/signin/ ```

``` 
Headers
Content-Type : application/json

HTTP method
POST
```

```javascript
{
    "email" : "test@test.com",
    "password" : "test"
}
```
#### Response

```javascript
{
    "message": "Auth successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI1ZGM3ZDlhZDU0YTc1NTM0ZDgwNmE5NjMiLCJpYXQiOjE1NzMzNzg2NjUsImV4cCI6MTU3MzM4MjI2NX0.N0QVz7a7xK9wZrWkqO7kRAe5-0gIoB7ZsLFCO_B2-Sg"
}
```


### Get all products

Return all products from the database

#### Request

``` http://localhost:5000/products/ ```

``` 
Headers
Content-Type : application/json

HTTP method
GET
```
#### Response

```javascript
{
    "count": int,
    "message": "All products",
    "products": array
}
```

### Get a single product

Return single product from the database

#### Request

``` http://localhost:5000/products/:id ```

``` 
Headers
Content-Type : application/json

HTTP method
GET
```
#### Response

```javascript
{
    "message": "Product with ID",
    "product": {
        "_id": string,
        "name": string,
        "price": int,
        "productImage": string
    }
}
```




### Product sorting

Return ascending or descending sorted products from the database

#### Request

``` http://localhost:5000/products/ ```

``` 
Headers
Content-Type : application/json

HTTP method
GET
```
#### Response

```javascript
{
    "message": "Product with ID",
    "product": {
        "_id": string,
        "name": string,
        "price": int,
        "productImage": string
    }
}
```



