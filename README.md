# Web engineering examples

Small, standalone TypeScript examples focused on type-safe application logic and defensive input handling.

## Examples

**Result patterns** (`src/result.ts`) demonstrate discriminated unions, success/error values, mapping, and fallbacks.

**Web validation** (`src/validation.ts`) demonstrates strict integer parsing and HTTPS redirects restricted to a named origin.

## Running the examples

Requires Node.js 22 or newer and npm.

```sh
npm install
npm run typecheck
npm test
```

GitHub Actions runs the same type checking and tests after pushes and pull requests.

## Scope

These are illustrative learning examples, not a deployable application, production security library, or substitute for comprehensive testing. The redirect helper must be paired with server-side enforcement. Input validation does not replace authentication or authorization.

No external application source, configuration, credentials, customer data, or internal infrastructure are included.

## Copyright and reuse

No open-source license is granted with this repository. Public visibility permits viewing, but does not by itself grant broad permission to reuse or redistribute the code. GitHub's platform terms may separately allow certain activities on the platform.
