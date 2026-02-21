# todo-with-nextjs-app-router_msnodesqlv8

A TODO application using **Next.js App Router** with the [msnodesqlv8](https://github.com/TimelordUK/node-sqlserver-v8) native SQL Server driver.

This is the App Router version of [todo-with-nextjs_msnodesqlv8](https://github.com/TimelordUK/todo-with-nextjs_msnodesqlv8) (which uses the Pages Router).

## The Key Fix for Native .node Modules

When using native Node.js addons like `msnodesqlv8` with the Next.js App Router, webpack will try to bundle the `.node` binary for the client, causing:

```
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type
```

The fix is in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  serverExternalPackages: ['msnodesqlv8'],
}
```

This tells Next.js to keep `msnodesqlv8` server-side only and not attempt to bundle the native binary.

## App Router Architecture

- **`app/page.tsx`** - Server component that queries the database directly using `msnodesqlv8`
- **`app/TodoList.tsx`** - Client component (`'use client'`) with interactive UI state
- **`app/api/task/route.ts`** - API route handlers using named exports (`GET`, `POST`)
- **`app/api/task/[id]/route.ts`** - Dynamic API route handlers (`PUT`, `DELETE`)

The server/client split ensures `msnodesqlv8` is never imported on the client side.

## Prerequisites

- Node.js
- SQL Server with ODBC Driver 18
- A database called `node` with a `Task` table:

```sql
CREATE TABLE Task (
    _id INT IDENTITY(1,1) PRIMARY KEY,
    task NVARCHAR(255) NOT NULL,
    completed BIT NOT NULL DEFAULT 0
)
```

## Configuration

Edit `utils/dbConnect.js` to match your SQL Server connection details:

```js
connStr: `Driver={ODBC Driver 18 for SQL Server};Server=127.0.0.1,1433;Database=node;UID=node_user;PWD=StrongPassword123!;TrustServerCertificate=yes;Connect Timeout=10`
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## See Also

- [msnodesqlv8](https://github.com/TimelordUK/node-sqlserver-v8) - Native SQL Server driver for Node.js
- [todo-with-nextjs_msnodesqlv8](https://github.com/TimelordUK/todo-with-nextjs_msnodesqlv8) - Pages Router version
