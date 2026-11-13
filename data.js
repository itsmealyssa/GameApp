// Seed data and pure helpers shared by the GameVault screens.
export const statusOptions = ['Backlog', 'Playing', 'Completed'];

export const initialGames = [
  { id: '1', title: 'Cyberpunk 2077', platform: 'PC', status: 'Completed', rating: 5, hours: 65, imageAsset: 'cyberpunk2077' },
  { id: '2', title: 'Battlefield 6', platform: 'PS5', status: 'Playing', rating: 4, hours: 45, imageAsset: 'battlefield6' },
  { id: '3', title: 'The Finals', platform: 'PC', status: 'Backlog', rating: 0, hours: 0, imageAsset: 'thefinals' },
  { id: '4', title: 'Apex Legends', platform: 'PC', status: 'Playing', rating: 3, hours: 60, imageAsset: 'apexlegends' },
];

export function createGameId() {
  return `game-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function normalizeGame(game, index = 0) {
  if (!game || typeof game !== 'object') return null;
  const title = String(game.title || '').trim();
  if (!title) return null;
  const status = statusOptions.includes(game.status) ? game.status : 'Backlog';
  const ratingValue = Number(game.rating);
  const hoursValue = Number(game.hours);
  const imageUrl = typeof game.imageUrl === 'string' ? game.imageUrl.trim() : '';
  return {
    id: String(game.id || `legacy-${index}`),
    title,
    platform: String(game.platform || 'Unknown').trim() || 'Unknown',
    status,
    rating: Number.isFinite(ratingValue) ? Math.min(5, Math.max(0, ratingValue)) : 0,
    hours: Number.isFinite(hoursValue) ? Math.max(0, hoursValue) : 0,
    ...(imageUrl ? { imageUrl } : {}),
    ...(typeof game.imageAsset === 'string' && game.imageAsset ? { imageAsset: game.imageAsset } : {}),
  };
}

export function normalizeGames(games) {
  if (!Array.isArray(games)) return [];
  return games.map((game, index) => normalizeGame(game, index)).filter(Boolean);
}

export function getStatusColor(status) {
  if (status === 'Completed') return '#A6E3A1';
  if (status === 'Playing') return '#F9E2AF';
  return '#F38BA8';
}

export function getStars(rating) {
  const score = Math.min(5, Math.max(0, Number(rating) || 0));
  return Array.from({ length: 5 }, (_, index) => (index < score ? '★' : '☆')).join('');
}

export function calculateTotalHours(gamesList) {
  return normalizeGames(gamesList).reduce((total, game) => total + game.hours, 0);
}

export function getCollectionStats(games = []) {
  const safeGames = normalizeGames(games);
  const total = safeGames.length;
  const completed = safeGames.filter((game) => game.status === 'Completed').length;
  const playing = safeGames.filter((game) => game.status === 'Playing').length;
  const backlog = safeGames.filter((game) => game.status === 'Backlog').length;
  const ratedGames = safeGames.filter((game) => game.rating > 0);
  const totalRating = ratedGames.reduce((sum, game) => sum + game.rating, 0);
  const platforms = new Set(safeGames.map((game) => game.platform.toLowerCase()));
  return {
    total,
    completed,
    playing,
    backlog,
    totalHours: safeGames.reduce((sum, game) => sum + game.hours, 0),
    completionRate: total ? Math.round((completed / total) * 100) : 0,
    averageRating: ratedGames.length ? (totalRating / ratedGames.length).toFixed(1) : '—',
    platformCount: platforms.size,
  };
}
