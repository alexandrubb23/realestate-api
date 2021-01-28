# Real Estate RESTful API

A small Node application according with the request.

## Getting Started

In order to run this app you will need to follow few steps, as follow:

### Prerequisites

Open your terminal and cloning the project:

```
git clone https://github.com/alexandrubb23/realestate-api.git
```

### Installing

In order to run this app on your local machine, head over to [Docker.com](https://www.docker.com/products/docker-desktop) donwload it and install it.

After you have installed Docker navigate to the app folder:

```
cd realestate-api
```

Before starting building the project, you have to create a .env file:

```
cp .env.example .env
```

**Make your necesar changes in .env file**

Now we are ready and we can tell Docker to mount our app in a container

```
docker-compose up -d --build
```

After Docker is finishing building our app, open your browser and type:

```
http://localhost:3001/
```

You should see **Cannot GET /**

Is time to populate our database with some dummy data so, navigate to src folder and run:

```
npm i
node seed.js
```

This step will also create a dummy user for us, as follow:

```
username: admin@appname.com
password: 12345
```

For example by typing **/api/categories** you'll see all the categories we have just created:

```
http://localhost:3001/api/categories
```

### Available routes:

- http://localhost:3001/api/categories
- http://localhost:3001/api/customers
- http://localhost:3001/api/users
- http://localhost:3001/api/auth
- http://localhost:3001/api/properties
- http://localhost:3001/api/media

## Automate testing

The app is using unit and integration tests.

### Running the tests

In order to run the tests, you have to install all the dependecies on your local machine.

From the app directory:

```
cd src
```

Skip this step if you already did it.

Install all dependencies:

```
npm i
```

And run the tests:

```
npm test
```

## Built With

- [NodeJS](https://nodejs.org/en/) - The web framework used
- [Express](https://expressjs.com/) - A minimal and flexible Node.js web application

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Alexandru Barbulescu** - _My profile_ - [Linkedin](https://www.linkedin.com/in/barbulescu-alexandru-3b94a6121/)
