# Bunsvr

## Synopsis

DmmD's barebone Bun http/https server template.

I made this because I need a framework to run my websites but don't understand `Svelte` or `React` at all and don't need the bloatedness from most major frameworks.
Bunsvr only has `chalk` as a true dependency for pretty colors. Everything else is completely built-in and written from scratch using `Bun` and `TypeScript`.

It's meant to be a personal template, but you can use it if you want. Just don't expect anything glorious from this repository.

By the way, feel free to ditch the template. Nothing except everything in `bunsvr/` is required for Bunsvr to execute.
The `library/` directory is just full of shortcuts and utility methods for my own convenience but is technically unnecessary.
The `assets/`, `resources/`, and `routes/` directories are exactly what they sound like. They also don't have any special meanings in this framework.
You can change all of this behavior in the `routes/` directory and `library/router.ts` file.

You can also check what Bunsvr version you got in the `bunsvr/bunsvr.ts` file.

Otherwise, that's it. Thank you for checking out my template repository.

## Installation

```
# Clone the repository
git clone https://github.com/dmmd-stuff/bunsvr my-project
cd my-project

# Install necessary packages
bun i

# Run the server
bun .
```

## Basic Usage

```ts
// Create a server with listen.ts
import listen from "./bunsvr/listen";
const server = listen(
    // 1. Define your preprocessor
    // Here is where you can process or alter incoming requests or insert your middlewares.
    // This callback must return a request.
    (server, request) => request,

    // 2. Defines your processor / router
    // Here is where you can replace it with your typical router.
    // This callback must resolve into a response.
    (server, request) => new Response("OK", 200),

    // 3. Defines your error handler
    // Typically, error handling should be resolved in the router.
    // However, this callback gives you an opportunity to handle any uncaught errors.
    // This callback must resolve into a response.
    (server, request, thrown) => new Response("Not OK", 400),

    // 4. Defines your postprocessor
    // Here is where you can process or alter outgoing responses.
    // This callback must return a response.
    (server, request, response) => response,

    // 5. Put the server port here
    3000
);
```

## Additional Features

| Feature | File | Description |
| - | - | - |
| Audit Log | `audit.ts` | Semi-cool audit logs using `chalk` as a dependency. |
| Event Emitter | `event.ts` | Simplied version of `Node.js`'s event emitter but with better type declarations. |
| HTTP Error Handler | `fault.ts` | Essentially an error class but with an http status code field attached. |
| Sqlite Database | `store.ts` | Minimalistic database using `Bun`'s `sqlite` library capable of storing simple key-value pair JSONs. |
| Privacy-First Tracking | `track.ts` | I know it sounds stupid but hear me out- |

## Contribution

Bunsvr is licensed under the MIT open source license.

Active contributions are welcome.

---

###### Last Updated: July 10th, 2025, 1:32 AM EST.
