# Pokémon Search App

A Next.js application for searching and exploring Pokémon using the PokéAPI.

## Features

- **Pokémon Search**: Search for Pokémon by name
- **Type Filtering**: Filter Pokémon by their types
- **Responsive Design**: Optimized for both desktop and mobile views
- **Detailed Information**: View detailed information about each Pokémon
- **Server-Side Rendering**: Initial data loaded on the server
- **Dynamic Routes**: Seamless navigation to Pokémon details
- **Breadcrumb Navigation**: Easy navigation back to the home page

## Tech Stack

- **Next.js (App Router)**: For server-side rendering and routing
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **PokéAPI**: For Pokemon data

## Techniques Used

1. **Server and Client Components**: Separation of server-rendered content and client-side interactivity
2. **Custom Hooks**: Separation of concerns with custom React hooks
3. **Server-Side Rendering**: Initial data is fetched on the server
4. **Server Actions**: API calls are handled on the server
5. **Dynamic Routes**: Each Pokémon has its own detail page

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
npm run build
```

### Production

Start the production server:

```bash
npm start
```

## Project Structure

- `app/`: Main application directory (Next.js App Router)
  - `page.tsx`: Home page
  - `api/`: API routes
  - `actions/`: Server actions
  - `components/`: React components
  - `hooks/`: Custom React hooks
  - `pokemon/[name]/`: Dynamic route for Pokémon details

## How it Works

1. The home page displays a grid of Pokémon cards with search and filter options
2. Users can search by name or filter by type
3. Clicking a Pokémon card navigates to its detail page
4. The detail page shows comprehensive information about the selected Pokémon
5. Breadcrumb navigation allows for easy return to the home page

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
