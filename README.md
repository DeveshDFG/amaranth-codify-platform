# Amaranth Codify Platform

[![Svelte](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=Svelte&logoColor=white)](https://svelte.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Postgres](https://img.shields.io/badge/Postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

## Setup

1. Clone the repository to your local machine.
2. Make sure you have Node.js installed. You can find instructions to install it from [nodejs.org](https://nodejs.org/).
3. Install `pnpm` if you haven't already. You can find instructions [here](https://pnpm.io/installation).
4. Install Docker from [docker.com](https://www.docker.com/get-started) and ensure it's running.
5. Navigate to the project directory in your terminal.
6. Run `./setup_env.sh` to create a `.env` file to create the necessary environment variables. Modifying this file or rerunning the script will overwrite any existing `.env` file and will require resetting and wiping the database.
7. Run the following command to install the dependencies so your editor can resolve them:
   ```bash
   pnpm install
   ```
8. Build the Docker images and start the services:
   ```bash
   docker-compose up --build
   ```
9. Open your browser and go to `http://localhost:8000` to access the application. Hot Module Replacement (HMR) should be working, so any changes you make to the code will automatically refresh the browser.

## Editing database schema

The schema files are in `./prisma/schema/`. Opt to use multiple schema files for better organization.

After making changes to the schema, run:

```bash
docker-compose exec web pnpm migrate
```

This will apply the migrations to the database. Make sure to push the migration files to the repository.

If there are migrations pulled from the repository that haven't been applied to your local database, run:

```bash
docker-compose exec web pnpm migrate:deploy
```

This will apply any pending migrations to the local database without processing any schema changes that potentially conflict with unapplied migrations.

### Database Management

You can use the Prisma CLI to interact with the database. For example, to open the Prisma Studio, run:

```bash
docker-compose exec web pnpm studio
```

and navigate to `http://localhost:5555` in your browser.

If there is a specific Prisma command you want to run, you can do so by executing:

```bash
docker-compose exec web pnpm prisma <command>
```

## Contributing

There are pre-commit hooks set up to ensure code quality and consistency, which will format your code and check commit messages before each commit.

Commit messages must follow the format:

```
<type>(<scope>): <subject>
```

Where:

- `<type>` is one of the following: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.
- `<scope>` is an optional scope of the change (e.g., component or file name).
- `<subject>` is a brief description of the change.
