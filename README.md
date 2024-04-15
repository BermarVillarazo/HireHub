# HireHub

CIT University IT-Enabled Applicant Tracking System

## Getting Started

Run the development server:

```bash
npm run dev
```

Run the drizzle database:

```bash
npx drizzle-kit studio
```

Generate a migration script

```bash
npx drizzle-kit generate:migration
```

Push your migration to PostgreSQL

```bash
npz drizzle-kit push:pg
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Install the dependencies

```bash
npm @auth/drizzle-adapter @lucia-auth/adapter-drizzle @vercel/postgres arctic drizzle-orm lucia
```

## Tech stack

-   [Nextjs 14](https://nextjs.org/docs/)
-   [Lucia + Arctic](https://arctic.js.org/providers/microsoft-entra-id)
-   [PostgreSQL + Drizzle ORM](https://orm.drizzle.team/docs/get-started-postgresql#postgresjs)
-   [Vercel](https://vercel.com/)

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) - learn about Next.js Routing.
-   [Next.js Pages ang Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) - learn about Next.js Pages and Layouts.
-   [Next.js Linking and Navigating](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating) - learn about Next.js Linking and Navigating.
-   [Next.js Dynamic Routing](https://nextjs.org/docs/app/building-your-application/dynamic-routes) - learn about Next.js Dynamic Routing.
-   [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) - learn about Next.js Server Actions.
