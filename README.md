# hono-licious

Get ready to feast on code that’s yummy and addictive! Here, we’ll whip up endpoints that are as fast as they are clean, just like a pro chef in the coding kitchen!

## Request methods

| Method   | Description                                                     |
| -------- | --------------------------------------------------------------- |
| `GET`    | Used to retrieve a single item or a collection of items.        |
| `POST`   | Used when creating new items e.g. a new user etc.               |
| `PATCH`  | Used to update one or more fields on an item e.g. name of user. |
| `DELETE` | Used to delete an item.                                         |

## Endpoint

| Method   | URL                   | Description                           |
| -------- | --------------------- | ------------------------------------- |
| `POST`   | `/api/users`          | Create a new user.                    |
| `GET`    | `/api/users`          | Retrieve all users.                   |
| `GET`    | `/api/users/1`        | Retrieve user #1.                     |
| `PATCH`  | `/api/users/1`        | Update data in user #1.               |
| `DELETE` | `/api/users/1`        | Delete user #1.                       |
| `POST`   | `/auth/login`         | Login into system.                    |
| `POST`   | `/auth/logout`        | Logout from system.                   |
| `POST`   | `/auth/refresh-token` | Create a new token and refresh-token. |

## Instalation

Clone the project

```bash
  git clone https://github.com/byannurcahyo/hono-licious.git
```

Go to the project directory

```bash
  cd hono-licious
```

Install dependencies

```bash
  bun install
```

Create .env

```bash
  cp .env.example .env
```

Add your Configuration

```bash
DATABASE_URL="mysql://root:@localhost:3306/change_with_your_database"
ACCESS_TOKEN_SECRET="your_secret"
REFRESH_TOKEN_SECRET="your_secret"
```

Migrate schema

```bash
  bun migrate
```

Seed data

```bash
  bun seed
```

Start the server

```bash
  bun dev
```

open http://localhost:3000

## Examples

```bash
{
    "username": "honolicious",
    "password": "12345678"
}
```
