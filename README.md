# الذكريات — Alzikrayat (MERN Edition)

Full-stack photo sharing app: **React (Vite)** + **Express** + **MongoDB (Mongoose)**.
Rebuild of the PHP MVC Alzikrayat project (Project 1) on the MERN stack.

## Requirements
- Node.js 18+
- MongoDB (local instance or MongoDB Atlas)

## Setup
### 1. Server
```bash
cd server
npm install
cp .env.example .env     # then edit MONGODB_URI if needed
npm run dev              # http://localhost:5000
```
Environment variables (`server/.env`, never committed):

| Name | Description |
|------|-------------|
| MONGODB_URI | MongoDB connection string |
| PORT | API port (default 5000) |

### 2. Client
```bash
cd client
npm install
npm run dev              # http://localhost:5173
```
Vite proxies `/api` and `/uploads` to the Express server (see `vite.config.js`).

## REST API
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | /api/auth/register | Create user (bcrypt hash) | – |
| POST | /api/auth/login | Login, returns public profile | – |
| GET | /api/photos | List photos | – |
| GET | /api/photos/:id | One photo | – |
| POST | /api/photos | Upload photo (multipart: title, description, image) | yes |
| DELETE | /api/photos/:id | Delete own photo | owner |
| GET | /api/photos/:id/comments | Comments of a photo | – |
| POST | /api/photos/:id/comments | Add comment | yes |

Auth (basic, per Project 3): the client sends the user's id in the `x-user-id` header.
JWT is left for the optional Project 4.

## Structure
`server/` models, routes, controllers, middleware, uploads · `client/src/` components, pages, context.
