import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialGames, normalizeGames } from './data';

export const COLLECTION_STORAGE_KEY = 'gamevault.collection.v1';
const LEGACY_STORAGE_KEY = 'gamevault.games';
const STORAGE_VERSION = 1;

export async function loadGames() {
  const storedValue = await AsyncStorage.getItem(COLLECTION_STORAGE_KEY);
  if (storedValue) return parseCollection(storedValue);

  const legacyValue = await AsyncStorage.getItem(LEGACY_STORAGE_KEY);
  if (legacyValue) return parseCollection(legacyValue);

  return initialGames;
}

function parseCollection(storedValue) {
  let parsed;
  try {
    parsed = JSON.parse(storedValue);
  } catch {
    throw new Error('Saved game data could not be read.');
  }
  const games = Array.isArray(parsed) ? parsed : parsed?.games;
  if (!Array.isArray(games)) throw new Error('Saved game data has an unsupported format.');
  return normalizeGames(games);
}

export async function saveGames(games) {
  const collection = { version: STORAGE_VERSION, games: normalizeGames(games) };
  await AsyncStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(collection));
}

export async function clearSavedGames() {
  await AsyncStorage.multiRemove([COLLECTION_STORAGE_KEY, LEGACY_STORAGE_KEY]);
}
