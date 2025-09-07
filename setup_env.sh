if [ ! -f .env ]; then
    touch .env
fi

add_env_var_if_missing() {
    local var_name="$1"
    local var_value="$2"
    if ! grep -q "^${var_name}=" .env; then
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

echo "BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET" >> .env
echo "BETTER_AUTH_URL=$BETTER_AUTH_URL" >> .env
