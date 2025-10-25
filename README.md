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
2. Make sure you have Node.js installed. You can find instructions to install it from [nodejs.org](https://nodejs.org/). It's recommended to use Node.js version 24.
3. Install `pnpm` if you haven't already. You can find instructions [here](https://pnpm.io/installation). It is recommended to use version 10.
4. Install Docker from [docker.com](https://www.docker.com/get-started) and ensure it's running.
5. Navigate to the project directory in your terminal.
6. Run `./setup_env.sh` to create a `.env` with the necessary environment variables. You will need to input some external secrets, such as the Google OAuth credentials, through the CLI prompts. If you need to reset or wipe the database due to changes in environment variables, see the [Emptying the Database](#emptying-the-database) section below.
7. Run the following command to install the dependencies so your editor can resolve them:
   ```bash
   pnpm install
   ```
8. Build the Docker images and start the services:
   ```bash
   docker-compose up
   ```

Open your browser and go to `http://localhost:8000` to access the application. Hot Module Replacement (HMR) should be working, so any changes you make to the code will automatically refresh the browser.

For subsequent runs, you can simply use the same command, skiping the build step if there are no changes to `docker-compose.yaml`.
But if there are build changes, such as new dependencies or Dockerfile changes, you should run:

```bash
docker-compose up --build
```

so that the images are rebuilt and dependencies are installed.

## Database

The application uses [PostgreSQL](https://www.postgresql.org/) as the database, and [Prisma](https://www.prisma.io/) as the ORM. The database is set up and managed through [Docker](https://www.docker.com/). User authentication is handled using [BetterAuth](https://www.better-auth.com/), so it is recommended to not change user data through Prisma directly.

### Editing database schema

The schema files are in `./prisma/schema/`. Opt to use multiple schema files for better organization.

After making changes to the schema, run:

```bash
docker-compose exec web pnpm db:migrate
```

This will apply the migrations to the database. Make sure to push the migration files to the repository.

If there are migrations pulled from the repository that haven't been applied to your local database, run:

```bash
docker-compose exec web pnpm db:migrate:deploy
```

This will apply any pending migrations to the local database without processing any schema changes that potentially conflict with unapplied migrations.

### Seeding

Seeding the database is helpful for populating it with initial data for development or testing purposes. To seed the database, run:

```bash
docker-compose exec web pnpm db:seed
```

### Database Management

You can use the Prisma CLI to interact with the database. For example, to open the Prisma Studio, run:

```bash
docker-compose exec web pnpm db:studio
```

and navigate to `http://localhost:5555` in your browser.

If there is a specific Prisma command you want to run, you can do so by executing:

```bash
docker-compose exec web pnpm prisma <command>
```

## Emptying the Database

If you need to reset the database to its initial state, you can drop all tables and reapply the migrations. Be cautious, as this will delete all data in the database.
Resetting the database is easily done by deleting the docker volume that stores the database data. You can do this by running:

```bash
docker-compose down -v
```

Then, start the services again with:

```bash
docker-compose up
```

and apply the migrations again with:

```bash
docker-compose exec web pnpm db:migrate
```

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment. The workflows are defined in the `.github/workflows` directory, which specifies various jobs that run on different events, such as pushes, pull requests, or at scheduled times.

The only ones currently set up are `test.yaml` and `pr.yaml`, which run tests and checks on pull requests. It is recommended to ensure that all tests pass before merging any pull requests. At the moment, no specific unit or end-to-end tests are implemented, but this may change in the future; the test only checks if the application builds successfully.

For now, there is no deployment workflow set up, though, in the future, additional workflows may be added for deployment or other tasks.

To test the workflows locally, you can use [act](https://nektosact.com/). The results are not guaranteed to be identical to GitHub Actions, but it can help catch major issues before pushing changes.

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

In general, opt to make small, focused commits that address a single issue or feature. This makes it easier to review and understand the changes. When making changes, make pull requests instead of pushing directly to the main branch. There may be scenarios where even multiple pull requests are needed to implement a large feature.

At the moment, reviews are not strictly enforced, but it is recommended to have at least one other person review your changes before merging, prompting any discussion if necessary. The pull requests make it easier to roll back changes if something goes wrong, even when no review occurred.
