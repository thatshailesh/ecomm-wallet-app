# Shopping Societites

A simple application to show flash sales and allow user to make trasactions through wallet

### Prerequisites

```
Node >= v10.0.0
Mongodb - 4.0.0
Mocha - Testing framework
Express - Node.js Framework
Eslint - Linting tool
```

### Installing

```
clone repo
cd && npm install
npm install mocha eslint -g
npm install -g node-mongo-seeds
npm install run-rs -g (replica-set to allow transactions in Mongodb)
```

### Getting Started

#### seed

- From the root of your project:

  ````sh
  		$ seed
  		```

  		**Note**: Every time you run `$ seed` it will blow away all the data in your collections and re-populate them with whatever is in your `/seeds` directory.
  ````

#### Running replica-set

```
$ run-rs --version 4.0.0 &
```

### Start

**Note**: Rename `.env.sample` file to `.env` and include relevant env variables

```
$ npm start
```

## Running the tests

```
$ npm test
```

### Products

- API

  - POST `/products/{id}/purchase`
    ```
    {
     “user_id” : 123
    }
    ```
  - Tests
    ```
    - should allow user to purchase product
    - should not allow transaction of negative balance
    - should fail to purchase without user id
    - should throw error for invalid dependecies
    ```

### Users

- API

  - GET `/users/wallet/{id}`
  - Tests
    ```
    - should fail to get the wallet for invalid user
    - should be able to get the valid user wallet
    ```

### Sales

- API

  - GET `/sales/current?country=SG`
  - Tests
    ```
    - should be able to get current flash sales
    - should not show flash sales of country other than SG
    ```

## Author

- **Shailesh Shekhawat** - _Initial work_ - [Github](https://github.com/thatshailesh)

## License

This project is licensed under the MIT License
