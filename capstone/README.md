# Full-Stack Portfolio and Blog (Capstone)

Student: Chen Xi (24998091)

Cumulative capstone built on the Lab 19 front end and the Lab 20 API.

- Live front end: REPLACE_WITH_YOUR_FRONT_END_URL
- Live API: REPLACE_WITH_YOUR_API_URL
- Front-end origin: REPLACE_WITH_YOUR_FRONT_END_URL

## What is inside

    server/   Express 5 + Mongoose 9 API (Lab 20, extended)
    client/   React 19 + React Router + Tailwind SPA (Lab 19, extended)

### Back end
- Models: User, Project, BlogPost, Comment, Message.
- bcrypt password hashing, JWT login, protect middleware, admin-only projects.
- Blog posts may only be edited or deleted by their author.
- Comments belong to a post; deleting a post also deletes its comments.
- helmet, CORS with an exact client origin, central error handler, rate limits.

### Front end
- Routes: `/`, `/projects`, `/projects/:projectId`, `/blog`, `/blog/:postId`,
  `/contact`, `/login`, `/register`, and protected `/admin`.
- Auth state in React Context; header changes for logged-in users.
- Contact form posts to the API; comments require login.
- Admin dashboard creates, updates, and deletes projects and blog posts.

## Local setup

### 1. Back end

    cd server
    npm ci
    copy .env.example to .env   (cp .env.example .env on macOS/Linux)
    # fill MONGO_URI and JWT_SECRET (32+ characters)
    npm run dev
    # API on http://127.0.0.1:3000, health check at /health

### 2. Front end

    cd client
    npm ci
    copy .env.example to .env   (VITE_API_URL=http://127.0.0.1:3000/api)
    npm run dev
    # open the address printed by Vite, usually http://localhost:5173

Use `127.0.0.1` rather than `localhost` in VITE_API_URL if the browser
cannot reach the API, because `localhost` may resolve to IPv6 first.

Registration creates an `author` account. Project changes need an admin:

    cd server
    npm run make-admin -- you@example.com

## API endpoints

| Method | Path | Access |
| --- | --- | --- |
| POST | /api/users/register | Public |
| POST | /api/users/login | Public |
| GET | /api/users/me | Logged in |
| GET | /api/projects | Public |
| GET | /api/projects/:id | Public |
| POST | /api/projects | Admin |
| PUT | /api/projects/:id | Admin |
| DELETE | /api/projects/:id | Admin |
| GET | /api/blog (also /api/posts) | Public |
| GET | /api/blog/:id | Public, includes comments |
| POST | /api/blog | Logged in |
| PUT | /api/blog/:id | Post author |
| DELETE | /api/blog/:id | Post author |
| GET | /api/blog/:postId/comments | Public |
| POST | /api/blog/:postId/comments | Logged in |
| DELETE | /api/blog/:postId/comments/:commentId | Comment or post author |
| POST | /api/contact | Public |
| GET | /api/contact | Admin |
| GET | /health | Public |

Protected requests send `Authorization: Bearer TOKEN`.
Errors use `{ "error": { "message": "..." } }`.

## Deployment

- API on Render: root directory `server`, build `npm ci`, start `npm start`,
  environment `MONGO_URI`, `JWT_SECRET`, `CLIENT_ORIGIN` (no trailing slash),
  `TRUST_PROXY=1`, `NODE_ENV=production`.
- Front end on Vercel or Netlify: root directory `client`, build `npm run build`,
  output `dist`, environment `VITE_API_URL=https://YOUR_API/api`.

## Submission

Zip `server` and `client` without `node_modules`, `dist`, or `.env`, named
`StudentID_StudentName_CapstoneProject.zip`, and submit the two live URLs.
