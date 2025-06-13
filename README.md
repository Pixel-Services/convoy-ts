# Convoy TypeScript Client

A type-safe TypeScript client library for the Convoy v4 API. This library provides a modern, fully typed interface for interacting with the Convoy API, making it easy to manage your servers and resources.

## Features

- Full TypeScript support with comprehensive type definitions
- Modern async/await API
- Built-in error handling
- Automatic request/response type checking
- Comprehensive JSDoc documentation
- Support for all Convoy v4 API endpoints

## Installation

```bash
npm install convoy-ts
```

## Quick Start

```typescript
import { createConvoy } from 'convoy-ts';

// Create a new client instance
const convoy = createConvoy({
  baseUrl: 'https://your-convoy-instance.com',
  token: 'your-api-token',
});

// List all servers
const servers = await convoy.servers.listServers();

// Create a new server
const newServer = await convoy.servers.createServer({
  name: 'my-server',
  type: 'kvm',
  resources: {
    cpu: 2,
    memory: 4096,
    disk: 50,
  },
});

// Start a server
await convoy.servers.startServer(newServer.id);
```

## API Documentation

### Server Management

The library provides comprehensive server management capabilities:

```typescript
// List servers with filtering
const servers = await convoy.servers.listServers({
  type: 'kvm',
  status: 'running',
  page: 1,
  per_page: 10,
});

// Get server details
const server = await convoy.servers.getServer(123);

// Update server
await convoy.servers.updateServer(123, {
  name: 'new-name',
  resources: {
    cpu: 4,
    memory: 8192,
  },
});

// Server operations
await convoy.servers.startServer(123);
await convoy.servers.stopServer(123);
await convoy.servers.restartServer(123);
await convoy.servers.suspendServer(123);

// Delete server
await convoy.servers.deleteServer(123);
```

## Error Handling

The library includes built-in error handling:

```typescript
try {
  const server = await convoy.servers.getServer(123);
} catch (error) {
  if (error.status === 404) {
    console.log('Server not found');
  } else {
    console.error('An error occurred:', error.message);
  }
}
```

## Type Safety

All API responses and requests are fully typed:

```typescript
import { Server, ServerStatus, ServerType } from 'convoy-ts';

// Type-safe server creation
const server: Server = await convoy.servers.createServer({
  name: 'my-server',
  type: ServerType.KVM, // Type-safe enum
  resources: {
    cpu: 2,
    memory: 4096,
    disk: 50,
  },
});

// Type-safe status check
if (server.status === ServerStatus.RUNNING) {
  // ...
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 