# Planet Flag Control

A real-time Next.js application where clients can be instructed over WebSocket to claim a planet by submitting a flag. Submitted flags are persisted with Prisma in SQLite and exposed through a REST API.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [How It Works](#how-it-works)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Database and Prisma](#database-and-prisma)
8. [API Reference](#api-reference)
9. [WebSocket Protocol](#websocket-protocol)
10. [Available Commands](#available-commands)
11. [Deployment Notes](#deployment-notes)
12. [Known Issues](#known-issues)
13. [Troubleshooting](#troubleshooting)

## Project Overview

This project combines:

- A Next.js App Router frontend.
- A custom Node HTTP server that also hosts a WebSocket server.
- Prisma ORM with SQLite for storing submitted flags.

The key user-facing flow is in `app/display/page.tsx`:

1. The display page opens a WebSocket connection.
2. It waits in an idle state.
3. When a message with `{ "active": true }` arrives, a claim form appears.
4. The user submits `name`, `initials`, and a `pattern`.
5. The data is posted to the API and persisted.

## Tech Stack

- Next.js `16.2.0` (App Router)
- React `19.2.4`
- TypeScript `5`
- Prisma `7.5.0`
- SQLite via `better-sqlite3` and `@prisma/adapter-better-sqlite3`
- WebSocket server via `ws`
- Tailwind CSS `4`

## How It Works

### Runtime Architecture

- `server.js` bootstraps Next.js and creates one shared HTTP server.
- A `WebSocketServer` attaches to that same HTTP server on port `3000`.
- Incoming WebSocket messages are broadcast to all connected clients except the sender.
- API route handlers use a shared Prisma client from `app/lib/prisma.ts`.

### Data Model

The app stores one model:

- `Flag`
  - `id: Int` (auto-increment primary key)
  - `createdAt: DateTime` (default now)
  - `name: String`
  - `initials: String`
  - `pattern: String`

Defined in `prisma/schema.prisma`.

## Project Structure

```text
app/
	api/
    flags/
			route.ts        # REST API for reading/creating flags
	display/
		page.tsx          # Real-time display/claim screen
	lib/
		prisma.ts         # Prisma singleton + SQLite adapter
	globals.css
	layout.tsx
	page.tsx            # Default Next.js starter page
prisma/
	schema.prisma
	migrations/
server.js             # Custom Next + WebSocket server
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
```

### 3. Apply migrations

```bash
npx prisma migrate dev
```

### 4. Run in development

```bash
npm run dev
```

Open:

- `http://localhost:3000` (default home page)
- `http://localhost:3000/display` (real-time claim UI)

## Environment Variables

| Variable       | Required | Default                          | Description                     |
| -------------- | -------- | -------------------------------- | ------------------------------- |
| `DATABASE_URL` | Yes      | `file:./dev.db` fallback in code | Prisma SQLite connection string |

Notes:

- Prisma config reads `process.env.DATABASE_URL`.
- Runtime client in `app/lib/prisma.ts` falls back to `file:./dev.db` if missing.

## Database and Prisma

### Generate Prisma client

```bash
npx prisma generate
```

### Create and apply a new migration

```bash
npx prisma migrate dev --name your_change_name
```

### Open Prisma Studio

```bash
npx prisma studio
```

## API Reference

Base URL (local): `http://localhost:3000`

### `GET /api/flags`

Returns all flags ordered by newest first.

Response `200`:

```json
[
  {
    "id": 1,
    "createdAt": "2026-03-20T14:45:00.000Z",
    "name": "Ada",
    "initials": "AL",
    "pattern": "Cross"
  }
]
```

### `POST /api/flags`

Creates a new flag using the JSON body.

Request body:

```json
{
  "name": "Ada",
  "initials": "AL",
  "pattern": "Cross"
}
```

Response `200`:

```json
{
  "id": 2,
  "createdAt": "2026-03-20T14:46:00.000Z",
  "name": "Ada",
  "initials": "AL",
  "pattern": "Cross"
}
```

## WebSocket Protocol

WebSocket endpoint (local):

`ws://localhost:3000`

Current behavior in `server.js`:

- Any text message received from one client is broadcast unchanged to every other connected client.
- The server does not validate payloads.

Example control message to activate the display form:

```json
{
  "active": true,
  "planetId": "7"
}
```

Example control message to return to idle:

```json
{
  "active": false
}
```

## Available Commands

From `package.json`:

- `npm run dev` - Start custom server in development mode.
- `npm run build` - Build Next.js for production.
- `npm run start` - Start custom server in production mode.

## Deployment Notes

Important: this project relies on `server.js` (custom Node server + WebSockets). Ensure your host supports long-running Node processes and WebSocket upgrades.

General production flow:

```bash
npm install
npm run build
npm run start
```

For SQLite in production:

- Use persistent disk storage for the `.db` file.
- Back up the database regularly.
- Consider migrating to a server database if horizontal scaling is needed.

## Known Issues

1. Home page (`app/page.tsx`) still contains the default Next.js starter template.

## Troubleshooting

### WebSocket does not connect

- Confirm the app is started via `npm run dev` (this runs `server.js`).
- Verify nothing else is using port `3000`.

### Prisma/database errors

- Check `.env` has a valid `DATABASE_URL`.
- Re-run migrations with `npx prisma migrate dev`.
- Regenerate client with `npx prisma generate`.

### API returns empty array

- This is expected before first submission.
- Insert a record with `POST /api/flags` or via the display flow.

---

If you want, I can also generate:

- A concise README variant (shorter for public repos).
- A Dutch version.
- API examples with `curl` commands for each endpoint.

# .env.example

DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="v8xtzwaG/RGpXR1tQzlYcrxJ0NpCBciNwgxfpBQoggVrjQGCxVsOkMl1EH3SN6jd"
NEXTAUTH_URL="http://localhost:3000"
