# Orvexa Backend

Scalable Express backend scaffold for the Orvexa marketplace.

## Architecture

- Routes: HTTP endpoints and middleware composition
- Controllers: request/response orchestration
- Services: business logic
- Repositories: SQL-only data access

## Run

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env` and adjust values.

## Notes

- PostgreSQL is configured via `DATABASE_URL`.
- Payments are intentionally not included yet.
- Most domain endpoints are scaffolded and return placeholder data until business logic is implemented.
