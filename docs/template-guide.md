# Template Creation Guide

To add a new template to BuildBot:

1. Create a new directory in `packages/templates/<template-name>`.
2. Add your template files.
3. Use Handlebars syntax for dynamic content:
   - `{{projectName}}`: The name of the project.
   - `{{options.typescript}}`: Boolean for TypeScript support.
   - `{{options.tailwind}}`: Boolean for Tailwind CSS support.
4. Rename `package.json` to `package.json.hbs` if it contains dynamic content.
5. Rename `README.md` to `README.md.hbs` if it contains dynamic content.

## Example `package.json.hbs`

```json
{
  "name": "{{projectName}}",
  "dependencies": {
    {{#if options.tailwind}}
    "tailwindcss": "^3.0.0"
    {{/if}}
  }
}
```

## Testing
Run the web app locally and try generating the new template to ensure it works as expected.
