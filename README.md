[![MIT License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/Swagger-Docs-brightgreen)](https://e-commerce-pern.herokuapp.com/api-docs)
[![Known Vulnerabilities](https://snyk.io/test/github/n-ii-ma/E-Commerce-API/badge.svg)](https://snyk.io/test/github/n-ii-ma/E-Commerce-API)

# E-Commerce API

A RESTful API Built with Node/Express and PostgreSQL for an E-Commerce App.

## Table of contents
+ [General Info](#general-info)
+ [Documentation](#documentation)
+ [Technologies](#technologies)
+ [Setup](#setup)
+ [Features](#features)
+ [Screenshots](#screenshots)
+ [Usage](#usage)
+ [Acknowledgements](#acknowledgements)
+ [License](#license)
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

- `DB_USER` : PostgreSQL user

- `DB_PASSWORD` : Password of that user

- `DB_HOST` : Hostname of the database

- `DB_PORT` : PostgreSQL port

- `DB_DATABASE` : Name of the database

- `SECRET` : Session secret

## Features
- Register an account
- Browse a set of products
- Add products to cart
- Check out cart and place an order
- View order history

## Screenshots

### Swagger Docs
![image](https://user-images.githubusercontent.com/88039431/164910384-cc4ab69c-a315-49a5-b029-349a70f2d30d.png)

### ERD
![E-Commerce ERD](https://user-images.githubusercontent.com/88039431/168246357-88bd5efc-2a8c-471b-bc14-9f4ab535a911.png)

## Usage
You can perform CRUD operations on these five endpoints:

- `auth` : Authenticate and authorize

- `users` : Registered users' data

- `products` : A set of products (*Samsung Galaxy Note smartphones*)

- `carts` : Users' carts

- `orders` : Users' order history

*You can use a platform like [Postman](https://www.postman.com/) to explore the functionalities of the API.*

## Acknowledgements
- This project was based on [Codecademy](https://www.codecademy.com/)'s back-end portfolio project in the Full-Stack Engineer Career Path.
- Samsung Galaxy Note smartphones' info was taken from [GSMArena](https://www.gsmarena.com/) and [PhoneArena](https://www.phonearena.com/).

## License
Distributed under the [MIT](https://opensource.org/licenses/MIT) License.

## Contact
Created by [n-ii-ma](https://github.com/n-ii-ma)

Feel free to contact me!
