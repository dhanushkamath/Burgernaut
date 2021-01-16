# Burgernaut
<<<<<<< HEAD
A distributed message-based food ordering system developed with RabbitMQ, Node.js, Express and MongoDB

# System Architecture
![Burgernaut System Architecture](https://github.com/dhanushkamath/Burgernaut/tree/main/docs/burgernaut-system.png)
## Getting Started (with Docker)
If you have Docker installed in your computer, you do not need to have Node.js, RabbitMQ or MongoDB installed. You can run the application with a single command:
  ```bash
  $ docker-compose up
  ```
Note: email-service requires a valid email ID and password to send order confirmations. Please update them in the <i>environment</i> section of <i>email-service</i> in <i>docker-compose.yml</i>.
## Getting Started (without Docker)
Without Docker, you need to install RabbitMQ, Node.js, NPM, MongoDB. </br>
To install Node.js and NPM, refer to the documentation provided [here](https://nodejs.org/en/download/package-manager).</br>
To install MongoDB, refer to the documentation provided [here](https://docs.mongodb.com/manual/installation/).
To install RabbitMQ, refer to the documentation provided [here](https://www.rabbitmq.com/download.html).
### Step 1 - Start RabbitMQ and MongoDB
To start RabbitMQ and MongoDB:
- Mac:
    ```bash
    $ mongod --config /usr/local/etc/mongod.conf
    ```
    ```bash
    $ rabbitmq-server
    ```

NOTE: Database and collection is automatically created with the first `POST` request to `/api/books`. No MongoDB configuration is required after installation - keeping MongoDB running is sufficient.
### Step 2 - Start all three node applications
To get the Node server running locally:
- `npm install` to install all required dependencies from package.json:
    ```bash
    $ npm install
    ```
- `npm run start` to start the local server. Run this for email-service, order-service and restaurant-service:
    ```bash
    $ npm run start
    ```
- `npm run dev` to start the local server in development mode:
    ```bash
    $ npm run dev
    ```

## API
## Add a new book
----
  Returns json containing newly added data.

* **URL**

  /api/books

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Query Params**

  None
  
 * **Data Params**
   
    **Required:**
    * `title: [string]`
    * `author: [string]`

* **Success Response:**

  * **Code:** 201 CREATED<br/>
    **Content:** `{
"id": "abcdefg1234,
"title": "Dockerizing your personal projects",
"author": "Dhanush Kamath"
}`


## Get all books
----
  Returns json data containing details of all books.

* **URL**

  /api/books

* **Method:**

  `GET`
  
*  **URL Params**
   
   None
    
*  **Query Params**
   
   None
    
 * **Data Params**
   
    None

* **Success Response:**

  * **Code:** 200<br/>
    **Content:** `{
    "books": [
        {
            "title": "Dockerize your personal projects!",
            "author": "Dhanush Kamath",
            "createdAt": "2020-12-24T20:59:42.516Z"
        },
        {
            "title": "Burgers and Cars: An Autobiography",
            "author": "Dhanush Kamath",
            "createdAt": "2020-12-24T21:04:27.111Z"
        }
    ]
}`
 

## Authors
* **Dhanush Kamath** - [dhanushkamath](https://github.com/dhanushkamath)
=======
A distributed message-based food ordering system developed with RabbitMQ, Node.js, Express and MongoDB
>>>>>>> af269ebbddb7cc34a6011341b5a2ba567224a3cf
