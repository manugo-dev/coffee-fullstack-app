# Deploy Action

Reusable GitHub Action for deploying any project to a server using Docker Compose. This action handles code synchronization, environment variable injection from GitHub Secrets, and automated deployment with Docker Compose.

## Features

- Code synchronization to server (excludes unnecessary files)
- Automatic `.env` file creation from GitHub Secrets
- Docker Compose deployment
- Automatic database migrations (if `backend` service exists)
- Caddy label configuration via environment variables
- Deployment path based on repository name: `/srv/apps/<repo-name>`

## Usage

### Basic Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: Prepare environment variables
        id: prepare-env
        run: |
          cat >> $GITHUB_OUTPUT << EOF
          env_vars<<ENVEOF
          API_KEY=${{ secrets.API_KEY }}
          NODE_ENV=production
          ENVEOF
          EOF

      - name: Deploy to server
        uses: ./.github/actions/deploy
        with:
          ssh_host: ${{ secrets.SSH_HOST }}
          ssh_user: ${{ secrets.SSH_USER }}
          ssh_key: ${{ secrets.SSH_KEY }}
          compose_file: "docker-compose.yml"
          env_vars: ${{ steps.prepare-env.outputs.env_vars }}
```

### Complete Example with Caddy

```yaml
- name: Prepare environment variables
  id: prepare-env
  run: |
    cat >> $GITHUB_OUTPUT << EOF
    env_vars<<ENVEOF
    POSTGRES_PASSWORD=${{ secrets.POSTGRES_PASSWORD }}
    NODE_ENV=production
    CADDY_FRONTEND_LABEL=${{ secrets.CADDY_FRONTEND_LABEL || 'app.example.com' }}
    CADDY_BACKEND_LABEL=${{ secrets.CADDY_BACKEND_LABEL || 'api.example.com' }}
    FRONTEND_PORT=3000
    BACKEND_PORT=5000
    ENVEOF
    EOF

- name: Deploy to server
  uses: ./.github/actions/deploy
  with:
    ssh_host: ${{ secrets.SSH_HOST }}
    ssh_user: ${{ secrets.SSH_USER }}
    ssh_key: ${{ secrets.SSH_KEY }}
    app_name: "my-app"
    compose_file: "docker-compose.prod.yml"
    env_vars: ${{ steps.prepare-env.outputs.env_vars }}
    exclude_patterns: "*.log,temp"
```

## Inputs

| Input              | Description                                             | Required | Default         |
| ------------------ | ------------------------------------------------------- | -------- | --------------- |
| `ssh_host`         | SSH server host                                         | Yes      | -               |
| `ssh_user`         | SSH username                                            | Yes      | -               |
| `ssh_key`          | SSH private key                                         | Yes      | -               |
| `compose_file`     | Docker Compose file to use                              | Yes      | -               |
| `app_name`         | Application name                                        | No       | Repository name |
| `env_vars`         | Environment variables as KEY=VALUE pairs (one per line) | No       | ''              |
| `exclude_patterns` | Additional rsync exclude patterns (comma-separated)     | No       | ''              |

## Outputs

| Output            | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `deployment_path` | Path where the application was deployed (`/srv/apps/<app-name>`) |

## Environment Variables

The action creates a `.env` file on the server with variables provided in `env_vars`. Format:

```
KEY1=value1
KEY2=value2
KEY3=value3
```

The file is created with restrictive permissions (600) and is overwritten on each deployment.

## Docker Compose Requirements

The action expects a Docker Compose file that:

- Uses the `edge` network (created automatically if it doesn't exist)
- Optionally includes Caddy labels for reverse proxy configuration:
  ```yaml
  labels:
    caddy: ${CADDY_FRONTEND_LABEL}
    caddy.reverse_proxy: "{{upstreams ${FRONTEND_PORT}}}"
  ```

## Automatic Migrations

If the Docker Compose file includes a service named `backend`, the action will attempt to run:

```bash
npx prisma migrate deploy
```

To disable migrations, either rename the service or modify the action.

## Server Directory Structure

```
/srv/apps/
  ├── <repo-name>/          # Or <app_name> if specified
  │   ├── .env             # Auto-generated from secrets
  │   ├── docker-compose.yml
  │   └── ... (project code)
```

## Excluded Files

By default, the following patterns are excluded from rsync:

- `.git`
- `node_modules`
- `.next`
- `dist`
- `coverage`
- `.github`
- `.env*`

Additional patterns can be specified via `exclude_patterns`.

## Required GitHub Secrets

Configure these secrets in **Settings → Secrets and variables → Actions**:

### SSH Configuration

- `SSH_HOST`: Server IP or domain
- `SSH_USER`: SSH username
- `SSH_KEY`: SSH private key

### Application Variables

- Application-specific secrets (e.g., `API_KEY`, etc.)

## Compatible Docker Compose Example

```yaml
services:
  backend:
    build: ./backend
    environment:
      NODE_ENV: ${NODE_ENV}
    labels:
      caddy: ${CADDY_BACKEND_LABEL}
      caddy.reverse_proxy: "{{upstreams ${BACKEND_PORT}}}"
    networks:
      - edge

  frontend:
    build: ./frontend
    environment:
      NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL}
    labels:
      caddy: ${CADDY_FRONTEND_LABEL}
      caddy.reverse_proxy: "{{upstreams ${FRONTEND_PORT}}}"
    depends_on:
      - backend
    networks:
      - edge

networks:
  edge:
    external: true
```

## Notes

- The `.env` file is automatically created on each deployment
- File permissions are set to `600` (read/write for owner only)
- Old Docker images are automatically cleaned up
- Migrations only run if a `backend` service exists
