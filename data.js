
// Seed data and shared helpers for GameVault.

export const statusOptions = [
  'Backlog',
  'Playing',
  'Played',
  'Completed',
];

export const storeOptions = [
  { id: 'steam', name: 'Steam' },
  { id: 'epic', name: 'Epic Games' },
  { id: 'playstation', name: 'PlayStation' },
  { id: 'xbox', name: 'Xbox' },
  { id: 'nintendo', name: 'Nintendo' },
];

// New installations start with an empty collection.
export const initialGames = [];

// Only remove the four original sample records.
// All three fields must match.
const sampleGames = [
  { id: '1', title: 'Cyberpunk 2077', imageAsset: 'cyberpunk2077' },
  { id: '2', title: 'Battlefield 6', imageAsset: 'battlefield6' },
  { id: '3', title: 'The Finals', imageAsset: 'thefinals' },
  { id: '4', title: 'Apex Legends', imageAsset: 'apexlegends' },
];

function isExampleGame(game) {
  return sampleGames.some(
    (sample) =>
      game.id === sample.id &&
      game.title === sample.title &&
      game.imageAsset === sample.imageAsset
  );
}

export function createGameId() {
  return `game-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function normalizeGame(game, index = 0) {
  if (!game || typeof game !== 'object' || isExampleGame(game)) {
    return null;
  }

  const title = String(game.title || '').trim();

  if (!title) return null;

  const status = statusOptions.includes(game.status)
    ? game.status
    : 'Backlog';

  const ratingValue = Number(game.rating);
  const hoursValue = Number(game.hours);

  const imageUrl =
    typeof game.imageUrl === 'string'
      ? game.imageUrl.trim()
      : '';

  const validStore = storeOptions.some(
    (store) => store.id === game.storeId
  );

  const steamAppId = Number(game.steamAppId);
  const source = String(game.source || '').toLowerCase();

  const isSteamImport =
    source === 'steam' ||
    (Number.isSafeInteger(steamAppId) && steamAppId > 0) ||
    String(game.id || '').startsWith('steam-');

  return {
    id: String(game.id || `legacy-${index}`),
    title,
    platform: String(game.platform || 'Unknown').trim() || 'Unknown',
    storeId: validStore ? game.storeId : null,
    status,
    rating: Number.isFinite(ratingValue)
      ? Math.min(5, Math.max(0, ratingValue))
      : 0,
    hours: Number.isFinite(hoursValue)
      ? Math.max(0, hoursValue)
      : 0,

    ...(Number.isSafeInteger(steamAppId) && steamAppId > 0
      ? { steamAppId }
      : {}),

    ...(isSteamImport
      ? { source: 'steam' }
      : source
        ? { source }
        : {}),

    ...(imageUrl ? { imageUrl } : {}),

    ...(typeof game.imageAsset === 'string' && game.imageAsset
      ? { imageAsset: game.imageAsset }
      : {}),
  };
}

export function normalizeGames(games) {
  if (!Array.isArray(games)) return [];

  return games
    .map((game, index) => normalizeGame(game, index))
    .filter(Boolean);
}

export function getStoreName(storeId) {
  if (!storeId) return 'Unassigned';

  return (
    storeOptions.find((store) => store.id === storeId)?.name ||
    'Unassigned'
  );
}

export function getStoreCounts(games = []) {
  const safeGames = normalizeGames(games);

  const counts = {
    unassigned: safeGames.filter((game) => !game.storeId).length,
  };

  storeOptions.forEach((store) => {
    counts[store.id] = safeGames.filter(
      (game) => game.storeId === store.id
    ).length;
  });

  return counts;
}

export function getStatusColor(status) {
  if (status === 'Completed') return '#A6E3A1';
  if (status === 'Played') return '#89B4FA';
  if (status === 'Playing') return '#F9E2AF';

  return '#F38BA8';
}

export function getStars(rating) {
  const score = Math.min(5, Math.max(0, Number(rating) || 0));

  return Array.from(
    { length: 5 },
    (_, index) => (index < score ? '★' : '☆')
  ).join('');
}

export function calculateTotalHours(gamesList) {
  return normalizeGames(gamesList).reduce(
    (total, game) => total + game.hours,
    0
  );
}

export function getCollectionStats(games = []) {
  const safeGames = normalizeGames(games);

  const total = safeGames.length;

  const completed = safeGames.filter(
    (game) => game.status === 'Completed'
  ).length;

  const playing = safeGames.filter(
    (game) => game.status === 'Playing'
  ).length;

  const played = safeGames.filter(
    (game) => game.status === 'Played'
  ).length;

  const backlog = safeGames.filter(
    (game) => game.status === 'Backlog'
  ).length;

  const ratedGames = safeGames.filter(
    (game) => game.rating > 0
  );

  const totalRating = ratedGames.reduce(
    (sum, game) => sum + game.rating,
    0
  );

  const platforms = new Set(
    safeGames.map((game) => game.platform.toLowerCase())
  );

  return {
    total,
    completed,
    playing,
    played,
    backlog,
    totalHours: safeGames.reduce(
      (sum, game) => sum + game.hours,
      0
    ),
    completionRate: total
      ? Math.round((completed / total) * 100)
      : 0,
    averageRating: ratedGames.length
      ? (totalRating / ratedGames.length).toFixed(1)
      : '—',
    platformCount: platforms.size,
  };
}
