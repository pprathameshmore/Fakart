![Icon](/assets/icons/fakart.jpg)

## Online Shopping Site Fake RESTful API
Online Shopping Site Fake RESTful API with MVC architecture.
Implemented the most popular HTTP routes.

[![Build Status](https://travis-ci.com/pprathameshmore/Fakart.svg?branch=master)](https://travis-ci.com/pprathameshmore/Fakart)
![GitHub top language](https://img.shields.io/github/languages/top/pprathameshmore/fakart?style=flat)
![GitHub](https://img.shields.io/github/license/pprathameshmore/fakart?style=flat)
![GitHub last commit](https://img.shields.io/github/last-commit/pprathameshmore/fakart?style=flat)

## Table of Contents

### User routes
* [Sign up user](#sign-up-user).
* [Sign in user](#sign-in-user).

### Product routes
* [Get all products](#get-all-products).
* [Get a single product](#get-a-single-product).
* [Get uploded photos](#get-all-quotes-by-keyword).
* [Products sorting](#product-sorting).
#### Protected routes
* [Add new product](#add-new-product).
* [Update product](#update-existing-product).
* [Delete product](#delete-existing-product).

### Order routes
* [Get all orders](#get-all-orders).
* [Get a single order](#get-a-single-order).
#### Protected routes
* [Add new order](#add-new-order).
* [Update new order](#update-existing-order).
* [Delete new order](#delete-existing-order).

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
    "message": string,
    "token": string
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
    "message": string,
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

#### Asceding order

#### Request

``` http://localhost:5000/products/asc/name? ```

```
Note : 'name' parameter optional, you can use it for sort by name. Default all products sorted by price
```

``` 
Headers
Content-Type : application/json

HTTP method
GET
```
#### Response

```javascript
{
    "message": string,
    "product": array
}
```

#### Descending order

#### Request

``` http://localhost:5000/products/asc/name? ```

```
Note : 'name' parameter optional, you can use it for sort by name. Default all products sorted by price
```

``` 
Headers
Content-Type : application/json

HTTP method
GET
```
#### Response

```javascript
{
    "message": string,
    "product": array
}
```

### Protected routes, you need an API key. You can get it one by [signing in](#sign-in-user) or [signing up](#sign-up-user) for service.


### Add new product

Add new product into database

#### Request

``` http://localhost:5000/products/ ```

``` 
Headers
Content-Type : application/x-www-form-urlencoded
Authorization : Bearer [API key]

HTTP method
POST
```

#### Body - (form-data)
```
"name" : string
"price" : string
"productImage : string
```

#### Response

```javascript
{
    "message" : string",
    "product" : {
        "_id" : string,
        "name" : string,
        "price" : string,
        "productImage" : string,
        "__v" : int
    }
}
```


### Update existing product

Update existing product into database

#### Request

``` http://localhost:5000/products/:id ```

``` 
Headers
Content-Type : application/x-www-form-urlencoded
Authorization : Bearer [API key]

HTTP method
PATCH
```

#### Body (form-data)
```
"name" : string
"price" : string
"productImage : string
```

#### Response

```javascript
{
    "message" : string",
    "product" : {
        "_id" : string,
        "name" : string,
        "price" : string,
        "productImage" : string,
        "__v" : int
    }
}
```

### Delete existing product

Delete product from database

#### Request

``` http://localhost:5000/products/:id ```

``` 
Headers
Content-Type : application/json
Authorization : Bearer [API key]

HTTP method
DELETE
```

#### Response

```javascript
{
    "message" : string",
    "product" : {
        "_id" : string,
        "name" : string,
        "price" : string,
        "productImage" : string,
        "__v" : int
    }
}
```

### Get all orders

Return all orders from the database

#### Request

``` http://localhost:5000/orders/ ```

``` 
Headers
Content-Type : application/json [optional]

HTTP method
GET
```
#### Response

```javascript
{
    "count": int,
    "message": string,
    "orders": array
}
```

### Get a single order

Return single order from the database

#### Request

``` http://localhost:5000/orders/:id ```

``` 
Headers
Content-Type : application/json [optional]

HTTP method
GET
```
#### Response

```javascript
{
    "message": string,
    "order": {
        "quantity": int,
        "_id": string,
        "productID": string
    }
}
```
### Protected routes, you need an API key. You can get it one by [signing in](#sign-in-user) or [signing up](#sign-up-user) for service.


### Add new order

Add new order into database

#### Request

``` http://localhost:5000/orders/ ```

``` 
Headers
Content-Type : application/json
Authorization : Bearer [API key]

HTTP method
POST
```

#### Body - (raw)
```
{
	"productID" : string,
	"qauntity" : string
}
```

#### Response

```javascript
{
    "message": string,
    "order": {
        "quantity": int,
        "_id": string,
        "productID": string,
        "__v": int
    }
}
```

### Update existing order

Update existing order into database

#### Request

``` http://localhost:5000/orders/:id ```

``` 
Headers
Content-Type : application/json
Authorization : Bearer [API key]

HTTP method
POST
```

#### Body (raw)
```
{
	"productID" : string,
	"qauntity" : string
}
```

#### Response

```javascript
{
    "message": string,
    "order": {
        "quantity": int,
        "_id": string,
        "productID": string,
        "__v": int
    }
}
```

### Delete existing order

Delete order from database

#### Request

``` http://localhost:5000/orders/:id ```

``` 
Headers
Content-Type : application/json
Authorization : Bearer [API key]

HTTP method
DELETE
```

#### Response

```javascript
{
    "message": string
}
```

## Contributing

All feedback and contributions are welcome!

## License

``` 
The MIT License (MIT)
=====================

Copyright © 2019 Prathamesh More

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE. ```