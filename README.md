# Amaranth Codify Platform

## Setup

1. Clone the repository to your local machine.
2. Install `deno` if you haven't already. You can find instructions [here](https://deno.land/manual/getting_started/installation).
3. Navigate to the project directory in your terminal.
4. Run the following command to install the dependencies:
   ```bash
   deno install
   ```
5. Start the development server with:
   ```bash
   deno run dev
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
