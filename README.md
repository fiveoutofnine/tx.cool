This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, Install all the project dependencies using:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Create a file `.env` in the root directory and install `dotenv` package.

Add API keys in your `.env` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=''
NEXT_PUBLIC_SUPABASE_ANON_KEY=''
SUPABASE_SERVICE_KEY=''

# Services
NEXT_PUBLIC_ALCHEMY_ID=''
TRANSPOSE_API_KEY=''
```

Take help of these links for getting your `API` stuff done:
- [Adding Supabase to NextJS](https://daily-dev-tips.com/posts/adding-supabase-to-a-nextjs-application/)
- [Alchemy](https://docs.alchemy.com/docs/alchemy-quickstart-guide)
- [Transpose](https://www.transpose.io/) - Sign up and get your Api key

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
