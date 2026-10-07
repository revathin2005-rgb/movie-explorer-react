# CineScope — Movie Explorer

A responsive movie discovery app built with React, Vite, React Router, and the TMDB API. Search for titles, browse popular movies by genre, see ratings and full movie details, and save favorites in a personal list.

## Features

- Search TMDB's movie catalog and browse popular titles by genre.
- Movie detail pages with poster, overview, release date, genres, runtime, rating, and top cast.
- Save and remove favorites; your list persists in browser local storage.
- Responsive layouts, loading states, empty states, and retryable API/network errors.
- Client-side routes for Discover, movie details, and My List.

## Requirements

- Node.js 18 or newer
- A free TMDB API key: create an account at [the TMDB developer settings](https://www.themoviedb.org/settings/api)

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file from the example:

   ```bash
   cp .env.example .env
   ```

3. Add your TMDB API key to `.env`:

   ```dotenv
   VITE_TMDB_API_KEY=your_actual_tmdb_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Create and locally preview a production build:

   ```bash
   npm run build
   npm run preview
   ```

Vite reads `.env` at startup, so restart the dev server after changing the API key. If the key is missing or invalid, CineScope shows an explanatory error in the app.

## Deployment

Deploy the repository to any static host that supports Vite builds (for example, Vercel, Netlify, or GitHub Pages). Set `VITE_TMDB_API_KEY` in the deployment platform's environment-variable settings, run `npm run build`, and publish the `dist` directory. Configure the host to serve `index.html` for application routes so React Router deep links work.

TMDB API keys included in a browser application are visible to visitors. Restrict the key in TMDB settings where possible, and do not use a private server-side credential as a Vite client variable.

## Project structure

```text
src/
  api/           TMDB API client and genre data
  components/    Reusable navigation, search, cards, filters, and states
  context/       Favorites state and local-storage persistence
  pages/         Discover, movie details, favorites, and not-found routes
  App.jsx        Application routes
  main.jsx       React entry point
  styles.css     Responsive application styles
```

Movie data, ratings, and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).
