# Architecture Overview

BuildBot follows a Clean Architecture approach within a monorepo structure.

## Structure

- `apps/web`: The Next.js web application.
- `packages/templates`: The source of truth for all templates.
- `packages/cli`: (Future) CLI tool.
- `packages/extension`: (Future) Browser extension.

## Core Components

### TemplateLoader
Responsible for reading template files from the filesystem. It handles binary files correctly and returns a list of file objects.

### TemplateRenderer
Responsible for processing text files using Handlebars. It replaces placeholders like `{{projectName}}` and handles conditional logic like `{{#if options.typescript}}`.

### ZipGenerator
Responsible for creating a ZIP archive in memory using JSZip. It takes the processed files and returns a binary buffer.

### API Layer
The `POST /api/generate` endpoint orchestrates the process:
1. Validates input using Zod.
2. Calls `TemplateLoader`.
3. Calls `TemplateRenderer`.
4. Calls `ZipGenerator`.
5. Returns the ZIP file to the client.

## Frontend
The frontend is built with Next.js App Router and Tailwind CSS. It uses React Hook Form for state management and validation.
