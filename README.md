# Amaranth Codify Platform

## Setup

1. Clone the repository to your local machine.
2. Make sure you have Node.js installed. You can find instructions to install it from [nodejs.org](https://nodejs.org/).
3. Install `pnpm` if you haven't already. You can find instructions [here](https://pnpm.io/installation).
4. Navigate to the project directory in your terminal.
5. Run the following command to install the dependencies:
   ```bash
   pnpm install
   ```
6. Start the development server with:
   ```bash
   pnpm run dev
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
