# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

`travfood` (PMD React Native Travel Food App) is an Expo managed React Native app for discovering travel destinations, hotels, and restaurants. Users browse attractions and food spots, view them on a map with nearby places (Google Places API), and save favorites. There is no backend of its own; all place data comes from Google Places and some static mock data checked into the repo.

## Tech stack

- Expo SDK `^50.0.17` (managed workflow, entry point is `node_modules/expo/AppEntry.js`)
- React Native `0.73.6`, React `18.2.0`
- TypeScript `^5.3.0`, but the codebase is mixed JS/TS: contexts, screens, and components are mostly `.tsx`/`.ts`, while `App.js`, `app/shared/Colors.js`, and `data/*.js` are plain JS. `tsconfig.json` extends `expo/tsconfig.base` with empty `compilerOptions`.
- NativeWind `^2.0.11` + Tailwind CSS `^3.3.2` for styling
- React Navigation v6: only a bottom tab navigator (`createBottomTabNavigator`) in `app/navigation/TabNavigation.tsx`, wrapped by a single `NavigationContainer` in `App.js`. There is no nested stack navigation.
- EAS Build (`eas.json`) for cloud builds

## Package manager and build

- npm, with `package-lock.json` committed (no yarn.lock, do not introduce one)
- No `metro.config.js` in the repo (Expo defaults apply)
- `devDependencies` is minimal, only `@babel/core`. There is no linter config and no test framework configured.
- Scripts: `npm start` / `expo start`, plus `android`, `ios`, `web` variants, all wrapping `expo start`

## Folder structure

- `app/components/` - UI components grouped by feature: `Attraction/`, `Hotel/`, `Restaurant/`, `Maps/` (with `NearByPlaces`, `PlaceDetail`, and shared subfolders), and `shared/`
- `app/context/` - React Context providers: `profilecontext.tsx` (user profile, persisted to AsyncStorage), `favouritecontext.tsx` (favorites, persisted to AsyncStorage), `UserLocationContext.ts` (device location state for the Maps feature)
- `app/navigation/TabNavigation.tsx` - the single bottom tab navigator (tabs: Hotel, Attraction, Restaurant, Map, Favourites, Profile), icons from `react-native-vector-icons`, headers hidden
- `app/screens/` - one folder per tab screen: `Attraction/`, `Favourite/`, `Hotel/`, `Maps/`, `Profile/`, `Restaurant/`
- `app/services/GlobalApi.ts` - direct `fetch()` calls to the Google Places API (`nearByPlace`, `searchByText`)
- `data/` - static mock data (`attraction.js`, `hotel.js`, `restuarant.js`) used alongside or instead of live API data
- `assets/` - images, icons, splash screen, fonts

## State management

Plain React Context API, no Redux or other state library. `App.js` wraps the app in `ProfileContextProvider` and `FavouritesContextProvider`, both of which persist their state to `AsyncStorage` (`@react-native-async-storage/async-storage`).

## External integrations and a known security issue

The app calls the Google Places API directly from `app/services/GlobalApi.ts`. The Google Maps API key is currently **hardcoded in plaintext** in both `app.json` (Android config) and `GlobalApi.ts`, instead of being read from an environment variable or Expo secrets mechanism. This is a real exposure (the key is committed to the git history and shipped in the app config) and should be treated as its own security follow-up, separate from dependency vulnerabilities.

## Testing and CI

There is no test framework, no test files, and no `.github/workflows` in this repo as of this writing. Any change that touches navigation, maps, async-storage, or image-picker should be manually smoke-tested with `expo start`, clicking through all six tabs, since there is nothing automated to catch regressions.

## Current initiative: Dependabot vulnerability remediation

As of 2026-07-06, GitHub Dependabot has 64 open alerts on this repo (3 critical, 34 high, 20 medium, 7 low). Nearly all of them are transitive dependencies pulled in by Expo's and React Native's own build tooling (`@expo/cli`, `@react-native-community/cli`, `metro`, `@react-native/dev-middleware`), for example `tar`, `node-forge`, `ws`, `fast-xml-parser`, `@xmldom/xmldom`, `form-data`, `js-yaml`, `lodash`, `qs`, `minimatch`, `picomatch`. These are dev-time/build-tool exposures rather than vulnerabilities shipped inside the compiled app bundle, but they still need fixing.

The fix mechanism for these transitive alerts is npm's `overrides` field in `package.json` (you cannot `npm install` a transitive dependency directly). `@babel/core` and `@babel/plugin-transform-modules-systemjs` are closer to the app's own dependency tree and are handled as a direct devDependency bump instead.

Work is tracked on the `security/dependabot-fixes` branch and its per-tier sub-branches, with GitHub issues and PRs managed via `gh` CLI (`gh issue create`, `gh pr create`). Pull the current alert list with:

```
gh api repos/hanzala-bhutto/PMD-React-Native-Travel-Food-App/dependabot/alerts --paginate
```

Note: `gh` on this machine is installed at `C:\Program Files\GitHub CLI\gh.exe` and may not be on PATH in every shell; invoke it by full path if `gh` is not found. The authenticated credential is a fine-grained personal access token, which needs the "Dependabot alerts: Read-only" repository permission explicitly granted on the token itself (adding scopes via `gh auth refresh` does not work for fine-grained PATs).
