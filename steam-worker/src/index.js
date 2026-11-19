
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'GET') {
      return jsonResponse({ error: 'Method not allowed.' }, 405);
    }

    if (url.pathname !== '/steam/games') {
      return jsonResponse({ error: 'Route not found.' }, 404);
    }

    const steamId = url.searchParams.get('steamId');

    if (!/^\d{17}$/.test(steamId || '')) {
      return jsonResponse({ error: 'A valid Steam ID is required.' }, 400);
    }

    if (!env.STEAM_API_KEY) {
      return jsonResponse({ error: 'Steam API is not configured.' }, 500);
    }

    const steamUrl = new URL(
      'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/'
    );

    steamUrl.searchParams.set('key', env.STEAM_API_KEY);
    steamUrl.searchParams.set('steamid', steamId);
    steamUrl.searchParams.set('include_appinfo', 'true');
    steamUrl.searchParams.set('include_played_free_games', 'true');

    try {
      const response = await fetch(steamUrl.toString());

      if (!response.ok) {
        return jsonResponse(
          { error: 'Steam API request failed.' },
          502
        );
      }

      const result = await response.json();
      const ownedGames = result.response?.games;

      if (!Array.isArray(ownedGames)) {
        return jsonResponse({
          error: 'Steam returned no visible game list. Check your Game Details privacy settings.',
        }, 403);
      }

      const games = ownedGames.map((game) => ({
        appId: game.appid,
        title: game.name || `Steam App ${game.appid}`,
        platform: 'PC',
        storeId: 'steam',
        hours: Math.round((game.playtime_forever || 0) / 60 * 10) / 10,
        imageUrl: game.img_logo_url
          ? `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`
          : `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`,
      }));

      return jsonResponse({
        steamId,
        total: games.length,
        games,
      });
    } catch (error) {
      return jsonResponse(
        { error: 'Unable to contact Steam. Please try again.' },
        502
      );
    }
  },
};
