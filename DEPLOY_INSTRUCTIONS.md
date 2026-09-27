# Deploy Instructions — School Management App (Next.js)

## Environment variables needed on Vercel

Copy these into Vercel's "Environment Variables" section (Project Settings → Environment Variables):

```
DATABASE_URL=<your Supabase Postgres connection string — see Step 2 below>
JWT_SECRET=R1GBjjfG2lDFbpwaTdn4DRpeRiMOJVRPQ8I-gzDRZQI
NEXTAUTH_SECRET=xzHS4hRdWfF5XaTfLDClE_2BK7DoreDpJ09assKpkOE
NEXTAUTH_URL=https://REPLACE-WITH-YOUR-VERCEL-URL.vercel.app
NEXT_PUBLIC_APP_URL=https://REPLACE-WITH-YOUR-VERCEL-URL.vercel.app
NEXT_PUBLIC_APP_NAME=Your School App
MSG91_AUTH_KEY=placeholder
MSG91_TEMPLATE_ID=placeholder
CLOUDINARY_CLOUD_NAME=placeholder
CLOUDINARY_API_KEY=placeholder
CLOUDINARY_API_SECRET=placeholder
```

## Build Command override (Vercel Project Settings → Build & Development Settings)

```
npx prisma generate && npx prisma db push --accept-data-loss && next build
```

This makes every deploy automatically sync the database schema — no manual migration commands needed.
