# E-Commerce API

A RESTful API Built with Node/Express and PostgreSQL for an E-Commerce App.

## Table of contents
+ [General Info](#general-info)
+ [Documentation](#documentation)
+ [Technologies](#technologies)
+ [Setup](#setup)
+ [Features](#features)
+ [Screenshot](#screenshot)
+ [Usage](#usage)
+ [Acknowledgements](#acknowledgements)
+ [Contact](#contact)

## General Info
A fully-functioning E-Commerce application REST API that allows users to perform various CRUD operations such as registering an account, browsing products for sale, purchasing products, etc.

## Documentation
https://e-commerce-pern.herokuapp.com/api-docs

*Built with [Swagger](https://swagger.io/)*

## Technologies
Project is created with:
+ express v4.17.3
+ node.js v16.14.2
+ npm v8.5.0
+ PostgreSQL v14.2

## Setup

### Installation
To run this project, install it locally using npm:
```
$ cd ../e-commerce-api
$ npm install
$ npm run dev
```
### Environment Variables
After installation, you will need to add the following environment variables to your `.env` file:

`DB_USER` : PostgreSQL user

`DB_PASSWORD` : Password of that user

`DB_HOST` : Hostname of database

`DB_PORT` : PostgreSQL port

`DB_DATABASE` : Name of database

`SECRET` : Session secret

## Features
- Register an account
- Browse a set of products
- Add products to cart
- Check out cart and place an order
- View order history

## Screenshot
TBA

## Usage
You can perform CRUD operations on these five endpoints:

`auth` : Authenticate and authorize

`users` : Registered users' data

`products` : A set of products (*Samsung Galaxy Note smartphones*)

`carts` : Users' carts

`orders` : Users' order history

*You can use a platform like [Postman](https://www.postman.com/) to explore the functionality of the API.*

## Acknowledgements
This project was based on [Codecademy](https://www.codecademy.com/)'s back-end portfolio project in the Full-Stack Engineer Career Path.

## Contact
Created by [n-ii-ma](https://github.com/n-ii-ma)

Feel free to contact me!
