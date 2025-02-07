## Welcome to Coachly, the Coach Booking App

This guide will help with running the PostgreSQL database in Docker and setting up Prisma for database management.

## Installation of Dependencies

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

```sh
yarn install
```

---

### **1. Start the PostgreSQL Database**

Start a PostgreSQL container:

```sh
docker-compose up -d
```

This will launch a PostgreSQL database using the configuration in `docker-compose.yaml`.

### **2. Check If the Database Is Running**

To verify that PostgreSQL is running, execute:

```sh
docker ps
```

---

### **1. Generate the Prisma Client**

```sh
yarn prisma generate
```

### **2. Apply Database Migrations**

```sh
yarn prisma migrate dev
```

### **3. Push the Schema to the Database**

```sh
yarn prisma db push
```

### **4. Verify Database Connection**

Run Prisma Studio to explore your database:

```sh
yarn prisma studio
```

---

## Seed the Database

```sh
yarn prisma db seed
```

---

## Run the development server:

```sh
yarn dev
```
