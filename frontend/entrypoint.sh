#!/bin/sh
set -e

# ── Runtime environment variable injection for Next.js ──────────────────────
#
# Next.js inlines NEXT_PUBLIC_* env vars into the JS bundle at build time.
# To allow runtime configuration without rebuilding, we:
#   1. Build with deterministic placeholders (e.g. __NEXT_PUBLIC_API_URL__)
#   2. At container startup, replace those placeholders with real values
#
# HOW TO ADD A NEW VARIABLE:
#   1. Add to the mapping table below:  map_env "EXTERNAL_NAME" "NEXT_PUBLIC_NAME"
#   2. In Dockerfile builder stage:     ENV NEXT_PUBLIC_NAME=__NEXT_PUBLIC_NAME__
#   3. In docker-compose.deploy.yml:    EXTERNAL_NAME: ${EXTERNAL_NAME:?required}
#   4. In frontend/src/shared/config/env.ts: read process.env.NEXT_PUBLIC_NAME
# ────────────────────────────────────────────────────────────────────────────

map_env() {
  local external_name="$1"
  local next_public_name="$2"
  local placeholder="__${next_public_name}__"

  # Read the external variable's value
  eval local value=\$"$external_name"

  if [ -n "$value" ]; then
    # Export as NEXT_PUBLIC_* so SSR pages can also read it
    export "$next_public_name=$value"
    # Replace the build-time placeholder in the client JS bundle
    find /app/.next -type f -name '*.js' -exec sed -i "s|${placeholder}|${value}|g" {} +
    echo "✅ ${external_name} → ${next_public_name}"
  else
    echo "⚠️  ${external_name} is not set — ${next_public_name} left as placeholder"
  fi
}

# ── Variable mappings ───────────────────────────────────────────────────────
# Usage: map_env "NAME_OF_ENV_EXTERNALLY" "NEXT_READY_ENV_NAME"
map_env "SERVICE_URL_BACKEND"                     "NEXT_PUBLIC_API_URL"
# ────────────────────────────────────────────────────────────────────────────

exec "$@"
