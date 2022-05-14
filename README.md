# Amigo v2

## Overview

Amigo v2 is a real-time chat application developed with Next.js along with a GraphQL API. This project is a remake of [Amigo](https://github.com/roynulrohan/amigo-chat). The "remake" is a migration to a slightly different stack and with improved features. The motivation behind this came from the lack of scalability and good practices in the first version.

## Table of Contents

-   [Stack](#stack)<br/>
-   [Development](#development)<br/>
<!-- -   [Screenshots](#screenshots)<br/> -->

## Stack

**Front-End**

-   Next.js
-   Redux
-   TypeScript
-   TailwindCSS, Sass
-   Framer-Motion
-   Apollo GraphQL Client
-   Socket.io Client

**Back-End**

-   Node.js
-   Express.js
-   Apollo GraphQL
-   TypeScript
-   Mongoose
-   Socket<span/>.io
-   JWT

**Database**

-   MongoDB Atlas

## Development

To run this application locally, you will need the following prerequisite programs:

-   [Node.JS and Yarn](https://nodejs.org/en/)
-   [Create Next App](https://nextjs.org/docs/api-reference/create-next-app)
-   [MongoDB Atlas](https://www.mongodb.com/)

**Server Setup**

First, install the necessary packages via:

```
yarn install
```

Then, setup the `.env` file in the root of the `/server` directory. (**Note**: this will be gitignored)

```bash
# mongo username
MONGO_USER=

# mongo password
MONGO_PASSWORD=

# mongo db name
MONGO_DB=

# JWT secret
JWT_SECRET=

# optional: port
PORT=
```

Now you can run the server. Default port is `4000`.

```bash
# start server
yarn run dev
```

**Client Setup**

First, install the necessary packages via:

```
yarn install
```

(Optional) Setup the `.env` file in the root of the `/client` directory. (**Note**: this will be gitignored)

```bash
# URI of API server along with the port
# eg. http://localhost:4000
API_URL=
```

Now you can run the clientproject.

```bash
# start react app
yarn run dev
```

<!-- ## Screenshots

Home Page
![](misc/Home-Page.png)
Market Page
![](misc/Market-Page.png)
Stock Page
![](misc/Stock-Page.png)
Account Page
![](misc/Account-Page.png) -->
