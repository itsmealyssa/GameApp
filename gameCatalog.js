const RAWG_API_URL = 'https://api.rawg.io/api/games';

export async function searchCatalogGames(query, signal) {
  const apiKey = process.env.EXPO_PUBLIC_RAWG_API_KEY;
  if (!apiKey) throw new Error('Online search is not configured. Add your RAWG key to .env and restart Expo.');

  const params = new URLSearchParams({ key: apiKey, search: query.trim(), page_size: '15' });
  const response = await fetch(`${RAWG_API_URL}?${params.toString()}`, { signal });
  if (!response.ok) throw new Error(`Game search failed (${response.status}). Try again in a moment.`);

  const payload = await response.json();
  return (Array.isArray(payload.results) ? payload.results : []).map((item) => ({
    id: `rawg-${item.id}`,
    title: item.name || 'Untitled game',
    platform: item.platforms?.[0]?.platform?.name || 'Unknown',
    status: 'Backlog',
    rating: 0,
    hours: 0,
    imageUrl: item.background_image || '',
    releaseDate: item.released || '',
    source: 'RAWG',
  }));
}
