# API Specification

## POST /api/generate

Generates a project ZIP file based on the selected template and options.

### Request Body

```json
{
  "template": "nextjs-starter" | "react-spa" | "node-express",
  "projectName": "string (1-50 chars, alphanumeric + hyphens)",
  "options": {
    "typescript": boolean,
    "tailwind": boolean,
    "eslint": boolean,
    "prettier": boolean
  }
}
```

### Response

- **Success (200)**: Returns a ZIP file stream. `Content-Type: application/zip`.
- **Bad Request (400)**: Invalid input. Returns JSON with validation errors.
- **Internal Server Error (500)**: Generation failed.

### Rate Limiting
(TODO: Implement rate limiting using Vercel KV or similar)
