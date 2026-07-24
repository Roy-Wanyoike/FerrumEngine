# 🔌 API Development Guide

## Overview

Your project uses **Next.js API Routes** in `src/app/api/` for the backend. Each file in this directory automatically becomes an API endpoint.

---

## 📍 Routing Structure

### File System → URL Mapping

```
src/app/api/
│
├── route.ts                          → GET /api
├── posts/
│   ├── route.ts                      → GET/POST /api/posts
│   └── [id]/
│       ├── route.ts                  → GET/PUT/DELETE /api/posts/[id]
│       └── comments/
│           └── route.ts              → GET/POST /api/posts/[id]/comments
│
└── users/
    ├── route.ts                      → GET/POST /api/users
    └── [id]/route.ts                 → GET/PUT/DELETE /api/users/[id]
```

---

## 🏗️ HTTP Methods

Each file exports functions for HTTP methods:

```typescript
export async function GET(request: Request) { }     // Retrieve data
export async function POST(request: Request) { }    // Create data
export async function PUT(request: Request) { }     // Update data
export async function PATCH(request: Request) { }   // Partial update
export async function DELETE(request: Request) { }  // Delete data
export async function HEAD(request: Request) { }    // Like GET, no body
```

---

## 🛠️ Creating Your First Endpoint

### Example 1: Simple GET Endpoint

**File:** `src/app/api/hello/route.ts`

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello, World!",
    timestamp: new Date().toISOString(),
  });
}
```

**Test it:**
```bash
curl http://localhost:3000/api/hello

# Response:
# {
#   "message": "Hello, World!",
#   "timestamp": "2026-07-24T10:00:00.000Z"
# }
```

---

## 💾 Working with Database

### Example 2: GET All Posts

**File:** `src/app/api/posts/route.ts`

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true, // Include author details
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
```

### Example 3: POST - Create New Post

```typescript
export async function POST(request: Request) {
  try {
    const { title, content, authorId } = await request.json();

    // Validate input
    if (!title || !authorId) {
      return NextResponse.json(
        { error: "Title and authorId are required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
```

---

## 🆔 Dynamic Routes

### Example 4: GET Single Post by ID

**File:** `src/app/api/posts/[id]/route.ts`

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
```

### Example 5: PUT - Update Post

```typescript
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const { title, content, published } = await request.json();

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        published,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
```

### Example 6: DELETE - Remove Post

```typescript
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
```

---

## 📤 Request Handling

### Getting Query Parameters

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  // GET /api/posts?page=2&limit=20
  console.log(page, limit); // "2", "20"
}
```

### Reading Request Body

```typescript
export async function POST(request: Request) {
  const body = await request.json();
  // or
  const formData = await request.formData();
}
```

### Getting Headers

```typescript
export async function GET(request: Request) {
  const token = request.headers.get("Authorization");
  const contentType = request.headers.get("Content-Type");
}
```

---

## 📨 Response Patterns

### Success Response

```typescript
// 200 OK (default)
return NextResponse.json({ data: "success" });

// 201 Created
return NextResponse.json(
  { data: "created" },
  { status: 201 }
);
```

### Error Response

```typescript
// 400 Bad Request
return NextResponse.json(
  { error: "Invalid input" },
  { status: 400 }
);

// 404 Not Found
return NextResponse.json(
  { error: "Resource not found" },
  { status: 404 }
);

// 500 Server Error
return NextResponse.json(
  { error: "Internal server error" },
  { status: 500 }
);
```

### Custom Headers

```typescript
const response = NextResponse.json(data);
response.headers.set("X-Custom-Header", "value");
return response;
```

---

## 🔐 Authentication & Middleware

### Example: Verify Bearer Token

```typescript
export async function GET(request: Request) {
  const token = request.headers.get("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const actualToken = token.slice(7);
  // Verify token...

  return NextResponse.json({ data: "protected" });
}
```

### Example: Middleware Function

```typescript
// lib/middleware.ts
export async function verifyAuth(request: Request) {
  const token = request.headers.get("Authorization");
  if (!token) throw new Error("No token");
  return { userId: "user-123" };
}

// api/protected/route.ts
import { verifyAuth } from "@/lib/middleware";

export async function GET(request: Request) {
  try {
    const user = await verifyAuth(request);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
```

---

## 🧮 Prisma Query Examples

### Find One

```typescript
const post = await prisma.post.findUnique({
  where: { id: "123" },
});

const post = await prisma.post.findFirst({
  where: { authorId: "user-123" },
});
```

### Find Many

```typescript
const posts = await prisma.post.findMany({
  where: { published: true },
  orderBy: { createdAt: "desc" },
  take: 10,
  skip: 0,
});
```

### Create

```typescript
const post = await prisma.post.create({
  data: {
    title: "New Post",
    content: "Content here",
    authorId: "user-123",
  },
});
```

### Update

```typescript
const post = await prisma.post.update({
  where: { id: "123" },
  data: { published: true },
});
```

### Delete

```typescript
await prisma.post.delete({
  where: { id: "123" },
});
```

### Count

```typescript
const count = await prisma.post.count({
  where: { published: true },
});
```

---

## 🧪 Testing API Endpoints

### Using cURL

```bash
# GET
curl http://localhost:3000/api/posts

# POST
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My Post","content":"Hello","authorId":"user-1"}'

# PUT
curl -X PUT http://localhost:3000/api/posts/123 \
  -H "Content-Type: application/json" \
  -d '{"published":true}'

# DELETE
curl -X DELETE http://localhost:3000/api/posts/123
```

### Using Fetch (Frontend)

```typescript
// GET
const posts = await fetch('/api/posts').then(r => r.json());

// POST
const newPost = await fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: "New", content: "Hello", authorId: "user-1" })
}).then(r => r.json());

// PUT
const updated = await fetch('/api/posts/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ published: true })
}).then(r => r.json());

// DELETE
await fetch('/api/posts/123', { method: 'DELETE' });
```

---

## ⚡ Performance Tips

### Use Query Optimization

```typescript
// Bad - fetches all posts
const posts = await prisma.post.findMany();

// Good - only needed fields
const posts = await prisma.post.findMany({
  select: { id: true, title: true, createdAt: true },
});

// Good - pagination
const posts = await prisma.post.findMany({
  take: 10,
  skip: (page - 1) * 10,
});
```

### Cache Responses

```typescript
const response = NextResponse.json(posts);
response.headers.set("Cache-Control", "max-age=60"); // 1 minute
return response;
```

### Error Handling

```typescript
try {
  const data = await prisma.post.findUnique({ where: { id } });
  if (!data) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(data);
} catch (error) {
  console.error("API Error:", error);
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}
```

---

## 📝 Prisma Setup (for reference)

### Initialize Prisma Client

**File:** `src/lib/prisma.ts`

```typescript
import { PrismaClient } from "@prisma/client";

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export { prisma };
```

### Use in API Route

```typescript
import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.user.findMany();
  return NextResponse.json(data);
}
```

---

## 🎯 Quick Checklist

- [ ] Create API folder: `src/app/api/posts/`
- [ ] Create `route.ts` with GET endpoint
- [ ] Test with `curl` or Postman
- [ ] Add POST endpoint to create items
- [ ] Create `[id]/route.ts` for dynamic routes
- [ ] Add PUT endpoint to update items
- [ ] Add DELETE endpoint to remove items
- [ ] Implement error handling
- [ ] Add authentication if needed
- [ ] Optimize Prisma queries

---

## 📚 Related Documentation

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Prisma Client](https://www.prisma.io/docs/orm/prisma-client)
- [NextResponse API](https://nextjs.org/docs/app/api-reference/functions/next-response)

---

**Last Updated:** 2026-07-24  
**Status:** Ready for API Development ✅
