# Deployment Guide

## How It Works

```
PR → CI (lint, test, build)
Merge to develop → CI → Build images → Push GHCR → Self-hosted runner → Trigger Coolify dev (localhost)
Merge to main   → CI → Build images → Push GHCR → Approval gate → Self-hosted runner → Trigger Coolify prod (localhost)
```

Images are tagged `<env>-latest` (mutable) + `<env>-<sha>` (immutable for rollbacks).

The deploy step runs on a **self-hosted runner** installed on the same server as Coolify.
This allows the Coolify API to listen only on `localhost`, eliminating external attack surface.

---

## Setup

### 1. Self-Hosted GitHub Runner

Install a GitHub Actions runner on the **same server** where Coolify is running:

1. Go to **Settings → Actions → Runners → New self-hosted runner** in your GitHub repo
2. Follow the install instructions for Linux x64
3. Configure and run as a systemd service for persistence:

```bash
cd ~/actions-runner
sudo ./svc.sh install
sudo ./svc.sh start
```

4. Verify the runner appears as **Idle** in **Settings → Actions → Runners**

> The runner is only used for the lightweight deploy trigger (~1s curl).
> All CI, build, and push jobs still run on GitHub-hosted `ubuntu-latest` runners.

### 2. Coolify API (localhost only)

Configure Coolify to listen on `localhost` only so the API is never exposed to the internet:

1. In Coolify **Settings → API**, enable the API and generate a token
2. Ensure Coolify's listen address is `127.0.0.1` (not `0.0.0.0`)
3. Verify from the VPS: `curl -s -H "Authorization: Bearer <token>" http://localhost:8000/api/v1/healthcheck`

> The API token still provides authentication, but since the port is not exposed externally,
> there is zero attack surface from the internet.

### 3. GitHub Environments

Create `dev` and `prod` in **Settings → Environments**, each with:

| Secret                | Value                                                   |
| --------------------- | ------------------------------------------------------- |
| `COOLIFY_TOKEN`       | Coolify API token                                       |
| `COOLIFY_WEBHOOK_URL` | `http://localhost:8000/api/v1/deploy?uuid=<stack-uuid>` |

Enable **"Required reviewers"** on `prod`.

> Note: The URL uses `http://localhost:8000` since the runner is on the same machine as Coolify.

### 4. Coolify Stacks

Per environment, create a **Docker Compose** stack pointing to `docker-compose.deploy.yml` and set these env vars:

```env
BACKEND_IMAGE=ghcr.io/<owner>/<repo>/backend:dev-latest
FRONTEND_IMAGE=ghcr.io/<owner>/<repo>/frontend:dev-latest

POSTGRES_USER=postgres
POSTGRES_PASSWORD=<strong-password>
POSTGRES_DB=coffee_db
POSTGRES_HOST=<coolify-db-hostname>
POSTGRES_PORT=5432

SERVICE_PORT_BACKEND=5000
SERVICE_URL_FRONTEND=https://coffee-dev.yourdomain.com
SERVICE_PORT_FRONTEND=3000
SERVICE_URL_BACKEND=https://api-dev.yourdomain.com
```

For prod, use `prod-latest` tags and production URLs.

> **Private repos only:** add a GHCR credential in Coolify (PAT with `read:packages`).

### 5. Rollback

Change image tags to the immutable SHA version in Coolify and redeploy:

```
BACKEND_IMAGE=ghcr.io/<owner>/<repo>/backend:prod-a1b2c3d
```

---

## Architecture

```
GitHub Actions (ubuntu-latest)         VPS (your server)
┌──────────────────────────┐          ┌─────────────────────────────┐
│  CI  → Build → Push GHCR │ ───────▶ │  Self-hosted runner          │
└──────────────────────────┘          │    │                         │
                                      │    ▼ curl localhost:8000     │
                                      │  Coolify API (127.0.0.1)    │
                                      │    │                         │
                                      │    ▼ pull images from GHCR   │
                                      │  Docker containers running   │
                                      └─────────────────────────────┘
```

**Why this works:**

- CI/build/push runs on fast GitHub-hosted runners (free minutes, cached layers)
- Only the deploy trigger (a single curl) runs on the self-hosted runner
- Coolify API never exposed to the internet — listens on `127.0.0.1` only
- Zero additional cost (runner uses negligible resources)

---

## Environment Variables

| Variable                | Where             | Why                                               |
| ----------------------- | ----------------- | ------------------------------------------------- |
| `SERVICE_URL_BACKEND`   | Coolify           | Mapped to `NEXT_PUBLIC_API_URL` at container boot |
| `SERVICE_URL_FRONTEND`  | Coolify           | CORS allowed origin                               |
| `POSTGRES_*`            | Coolify           | Database credentials                              |
| `SERVICE_PORT_BACKEND`  | Coolify           | NestJS listen port                                |
| `SERVICE_PORT_FRONTEND` | Coolify           | Next.js listen port                               |
| `BACKEND_IMAGE`         | Coolify           | GHCR image to pull                                |
| `FRONTEND_IMAGE`        | Coolify           | GHCR image to pull                                |
| `COOLIFY_TOKEN`         | GitHub Env Secret | Authenticates deploy webhook                      |
| `COOLIFY_WEBHOOK_URL`   | GitHub Env Secret | Coolify deploy endpoint (`localhost`)             |

No `.env` files in production. Coolify is the single source for app config; GitHub Environments for CI/CD secrets only.

---

## Adding a New Environment

1. Create a branch (e.g. `staging`)
2. Copy `deploy-dev.yml` → `deploy-staging.yml`, change branch and environment
3. Add `staging` to `ci.yml` → `on.pull_request.branches`
4. Create GitHub Environment `staging` with `COOLIFY_TOKEN` + `COOLIFY_WEBHOOK_URL`
5. Create a Coolify stack with `staging-latest` image tags

No changes needed to `build-and-deploy.yml`, `docker-compose.deploy.yml`, or any Dockerfile.
