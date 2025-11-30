# Folder Structure Implementation Guide

## Overview
BuildBot now supports 3 different folder structures for generated projects:
1. **Standard** - Default Next.js/React/Node structure
2. **Clean Architecture** - Layered architecture with clear separation of concerns
3. **Feature-based** - Organized by features/modules

## Implementation Strategy

Since we can't dynamically restructure files in the ZIP, we'll use Handlebars conditionals to:
1. Include README files that document the recommended structure
2. Create example folders/files for each structure type
3. Provide clear instructions in the generated README

## Structure Definitions

### Standard (Default)
```
app/ or src/
├── components/
├── lib/ or utils/
├── hooks/
├── types/
└── styles/
```

### Clean Architecture
```
src/
├── domain/          # Business logic & entities
│   ├── entities/
│   └── use-cases/
├── application/     # Application services
│   └── services/
├── infrastructure/  # External concerns
│   ├── api/
│   └── database/
└── presentation/    # UI layer
    ├── components/
    └── pages/
```

### Feature-based
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── dashboard/
│       ├── components/
│       ├── hooks/
│       └── services/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── core/
    ├── config/
    └── types/
```
