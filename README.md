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
npx drizzle-kit generate:pg
```

Push your migration to PostgreSQL

```bash
npx drizzle-kit push:pg
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Install the dependencies

```bash
npm i @auth/drizzle-adapter @edgestore/react @edgestore/server @lucia-auth/adapter-drizzle @nextui-org/radio @vercel/postgres arctic dotenv drizzle-orm lucia lucide-react pg react-hot-toast zod
```

## .env

```bash
# For Capstone
DATABASE_URL=
DATABASE_PASSWORD=

# For Integration
POSTGRES_DATABASE=
POSTGRES_PASSWORD=
POSTGRES_PRISMA_URL=
POSTGRES_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

MICROSOFT_TENANT_ID=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
MICROSOFT_REDIRECT_URI=http://localhost:3000/api/auth/microsoft/callback

EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
```

## For Capstone

File location: /HireHub/drizzle.config.ts

```bash
dbCredentials: {
        # This is the configuration to connect to your db
        # Please change the "POSTGRES_URL" to your Database Url in your .env file
        connectionString: process.env.POSTGRES_URL!,
    }
```

## For the file structure

Server Actions: /HireHub/action/action.ts

Images/icons/svg's: /HireHub/public/*

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
