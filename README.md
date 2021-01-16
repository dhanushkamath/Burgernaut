# Burgernaut
A distributed message-based food ordering system developed with RabbitMQ, Node.js, Express and MongoDB

# System Architecture

![Burgernaut System Architecture](docs/burgernaut-system.png)
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
## Place a new order
----
  Returns json containing order details.

* **URL**

  /api/orders

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Query Params**

  None
  
 * **Data Params**
   
    **Required:**
    * `items: [array]`
    * `author: [string]`

* **Success Response:**

  * **Code:** 201 CREATED<br/>
    **Content:** `{ <to-be-filled> }`


## Get order details
----
  Returns json data containing details of all books.

* **URL**

  /api/orders/:id

* **Method:**

  `GET`
  
*  **URL Params**
   `id: [string]`
   
    
*  **Query Params**
   
   None
    
 * **Data Params**
   
    None

* **Success Response:**

  * **Code:** 200<br/>
    **Content:** `{ <to-be-filled> }`
 
## Authors
* **Dhanush Kamath** - [dhanushkamath](https://github.com/dhanushkamath)