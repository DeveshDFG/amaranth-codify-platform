if [ ! -f .env ]; then
    touch .env
fi

env_var_exists() {
    local var_name="$1"
    grep -q "^${var_name}=" .env
}

add_env_var_if_missing() {
    local var_name="$1"
    local var_value="$2"
    if ! env_var_exists "$var_name"; then
        echo "${var_name}=${var_value}" >> .env
        echo "${var_name} was appended to .env"
    fi
}

POSTGRES_USER=$(openssl rand -base64 12 | tr -dc 'A-Za-z0-9' | head -c 12)
POSTGRES_PASSWORD=$(openssl rand -base64 24 | tr -dc 'A-Za-z0-9' | head -c 16)
POSTGRES_DB="db"
DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@postgres:5432/$POSTGRES_DB"

add_env_var_if_missing "POSTGRES_USER" "$POSTGRES_USER"
add_env_var_if_missing "POSTGRES_PASSWORD" "$POSTGRES_PASSWORD"
add_env_var_if_missing "POSTGRES_DB" "$POSTGRES_DB"
add_env_var_if_missing "DATABASE_URL" "$DATABASE_URL"

BETTER_AUTH_SECRET=$(openssl rand -base64 24 | tr -dc 'A-Za-z0-9' | head -c 32)
BETTER_AUTH_URL="http://localhost:8000"

add_env_var_if_missing "BETTER_AUTH_SECRET" "$BETTER_AUTH_SECRET"
add_env_var_if_missing "BETTER_AUTH_URL" "$BETTER_AUTH_URL"

DEFAULT_ADMIN_EMAIL="admin@example.com"
DEFAULT_ADMIN_PASSWORD=$(openssl rand -base64 24 | tr -dc 'A-Za-z0-9' | head -c 8)
DEFAULT_ADMIN_NAME="admin"

# Seed data
add_env_var_if_missing "DEFAULT_ADMIN_EMAIL" "$DEFAULT_ADMIN_EMAIL"
add_env_var_if_missing "DEFAULT_ADMIN_PASSWORD" "$DEFAULT_ADMIN_PASSWORD"
add_env_var_if_missing "DEFAULT_ADMIN_NAME" "$DEFAULT_ADMIN_NAME"


# Google OAuth Credentials
if ! env_var_exists "GOOGLE_CLIENT_ID"; then
    read -p "Enter GOOGLE_CLIENT_ID: " GOOGLE_CLIENT_ID
    add_env_var_if_missing "GOOGLE_CLIENT_ID" "$GOOGLE_CLIENT_ID"
fi
if ! env_var_exists "GOOGLE_CLIENT_SECRET"; then
    read -p "Enter GOOGLE_CLIENT_SECRET: " GOOGLE_CLIENT_SECRET
    add_env_var_if_missing "GOOGLE_CLIENT_SECRET" "$GOOGLE_CLIENT_SECRET"
fi