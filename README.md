This is a [Next.js](https://nextjs.org/) project bootstrapped
with [Feature-Sliced Design](https://feature-sliced.design/docs).

## Getting Started

Install the dependencies:

```bash
yarn
```

Run the development server:

```bash
yarn dev
```

Build the app:

```bash
yarn build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Feature-Sliced Design, take a look at the following resources:

- [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/overview).

## Feature-Sliced Design

### Naming conventions

- **app** - root Next.js folder for routes
- **pages** - root Next.js folder for routes
- **src** - root folder for source code
- **src/app** - app-wide settings, styles and providers. (e.g. theme, global styles, providers)
- **src/pages** - compositional layer to construct full pages from entities, features and widgets.
- **src/widgets** - compositional layer to combine entities and features into meaningful blocks. (e.g. IssuesList,
  UserProfile)
- **src/features** - user interactions, actions that bring business value to the user. (e.g. SendComment, AddToCart,
  UsersSearch)
- **src/entities** - business entities. (e.g., User, Product, Order)
- **src/shared** - reusable functionality, detached from the specifics of the project/business. (e.g. UIKit, libs, API)

### Folders can contain:

- **api** - Segment: API-logic (services)
- **ui** - Segment: UI-logic (components)
- **model** - Segment: Business-logic (slices, thunks, types)
- **lib** - Segment: Libs (utils, helpers, etc.)
- **config** - Segment: Configs/settings for application or slices
