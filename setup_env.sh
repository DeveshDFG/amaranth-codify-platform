if [ -f .env ]; then
    echo "Warning: Regenerating .env may require resetting your database."
    read -p ".env exists. Overwrite? (y/N): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
    rm .env
fi

POSTGRES_USER=$(openssl rand -base64 12 | tr -dc 'A-Za-z0-9' | head -c 12)
POSTGRES_PASSWORD=$(openssl rand -base64 24 | tr -dc 'A-Za-z0-9' | head -c 16)
POSTGRES_DB="db"
DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@postgres:5432/$POSTGRES_DB"

echo "POSTGRES_USER=$POSTGRES_USER" >> .env
echo "POSTGRES_PASSWORD=$POSTGRES_PASSWORD" >> .env
echo "POSTGRES_DB=$POSTGRES_DB" >> .env
echo "DATABASE_URL=$DATABASE_URL" >> .env

BETTER_AUTH_SECRET=$(openssl rand -base64 24 | tr -dc 'A-Za-z0-9' | head -c 32)
BETTER_AUTH_URL="http://localhost:8000"

echo "BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET" >> .env
echo "BETTER_AUTH_URL=$BETTER_AUTH_URL" >> .env
