# GameVault

GameVault is a React Native and Expo game collection and backlog tracker. Add games manually or find them in the RAWG catalog, manage cover URLs, track status, rating and playtime, and keep the collection on the device with AsyncStorage.

## Run locally

1. Install Node.js and project dependencies with `npm install`.
2. Copy `.env.example` to `.env` and add a RAWG API key if you want online catalog search.
3. Start Expo with `npx expo start`, then open the QR code in Expo Go.

Expo SDK 57 recommends AsyncStorage 2.2.0. For a fresh setup, `npx expo install @react-native-async-storage/async-storage` chooses the SDK-compatible version.

## Features

- Collection, backlog, statistics and store-status screens.
- Create, edit and remove games; edit title, platform, story status, rating, play hours and cover image URL.
- Local starter covers with a fallback placeholder for missing or broken images.
- Search the local collection by title or platform and filter by status.
- AsyncStorage persistence with a versioned collection record and fallback to starter data.
- RAWG-powered online game search with loading, empty and error feedback.
- Store linking is intentionally disabled. No account is shown as connected until real provider sign-in is implemented.

## RAWG catalog configuration

Create a RAWG API key and set `EXPO_PUBLIC_RAWG_API_KEY` in `.env`. Restart Expo after changing environment values. RAWG attribution is shown in the search screen.

Expo public environment variables are bundled into the client app. Treat this key as public, never put a password or private credential here, and use a backend proxy with rate limits for production. See [Expo environment variables](https://docs.expo.dev/guides/environment-variables/) and [RAWG API documentation](https://rawg.io/apidocs).

## Cover images

Enter an image URL beginning with `http://` or `https://` in the game form. The form supports replacing and removing a cover. Broken or empty URLs fall back to a local cover when available, then to a gamepad placeholder.

## Persistence and privacy

The collection is stored locally using AsyncStorage. It is unencrypted and should contain only game-tracking data, not passwords, authentication tokens or other secrets. Clearing app data removes the local collection.

## Project structure

- `App.js`: navigation, shared collection state, hydration and save lifecycle.
- `data.js`: seed collection, normalization and derived statistics.
- `gameStorage.js`: versioned JSON persistence with AsyncStorage.
- `gameCatalog.js` and `GameSearchScreen.js`: RAWG requests and online search UI.
- `GameCover.js`: local and remote cover rendering with graceful fallback.
- `HomeScreen.js`, `BacklogScreen.js`, `StatsScreen.js`: collection views.
- `AddGameScreen.js` and `DetailsScreen.js`: create, edit, rate, update and remove flows.
- `StoresScreen.js`: provider setup status; no simulated account binding.

## Course concepts used

Functional components, JSX, core React Native UI, Flexbox, `useState`, `useEffect`, props, navigation, `TextInput`, `FlatList`, input validation, `fetch`, `async`/`await`, loading and error states, JSON serialization, AsyncStorage, CRUD, `map`, `filter`, spread syntax and derived statistics.
