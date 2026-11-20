
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

function parseSteamProfile(input) {
  const value = String(input || '').trim();

  if (!value) {
    throw new Error('Enter your Steam ID or profile link.');
  }

  if (/^\d{17}$/.test(value)) {
    return { steamId: value };
  }

  let profile = value;

  if (/^https?:\/\//i.test(value)) {
    let parsed;

    try {
      parsed = new URL(value);
    } catch {
      throw new Error('Invalid Steam profile URL.');
    }

    const host = parsed.hostname.toLowerCase();

    if (
      host !== 'steamcommunity.com' &&
      host !== 'www.steamcommunity.com'
    ) {
      throw new Error('Please use a steamcommunity.com profile link.');
    }

    const parts = parsed.pathname.split('/').filter(Boolean);

    if (parts.length < 2) {
      throw new Error('Steam profile link is incomplete.');
    }

    if (parts[0] === 'profiles' && /^\d{17}$/.test(parts[1])) {
      return { steamId: parts[1] };
    }

    if (parts[0] === 'id' && parts[1]) {
      profile = parts[1];
    } else {
      throw new Error('Use a Steam /id/ or /profiles/ profile link.');
    }
  } else {
    profile = value;
  }

  if (
    !/^[a-zA-Z0-9_-]{2,64}$/.test(profile)
  ) {
    throw new Error('Invalid Steam ID or custom profile name.');
  }

  return { vanityName: profile };
}

async function resolveSteamId(input, apiKey) {
  const parsed = parseSteamProfile(input);

  if (parsed.steamId) {
    return parsed.steamId;
  }

  const resolveUrl = new URL(
    'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/'
  );

  resolveUrl.searchParams.set('key', apiKey);
  resolveUrl.searchParams.set('vanityurl', parsed.vanityName);

  const response = await fetch(resolveUrl.toString());

  if (!response.ok) {
    throw new Error('Steam could not resolve this profile.');
  }

  const result = await response.json();
  const resolved = result.response;

  if (resolved?.success !== 1 || !/^\d{17}$/.test(resolved.steamid || '')) {
    throw new Error(
      'Steam profile not found. Check your custom profile URL.'
    );
  }

  return resolved.steamid;
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

    if (!env.STEAM_API_KEY) {
      return jsonResponse(
        { error: 'Steam API is not configured.' },
        500
      );
    }

    const profileInput =
      url.searchParams.get('profile') ||
      url.searchParams.get('steamId');

    let steamId;

    try {
      steamId = await resolveSteamId(
        profileInput,
        env.STEAM_API_KEY
      );
    } catch (error) {
      return jsonResponse(
        { error: error.message || 'Could not resolve Steam profile.' },
        400
      );
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
        return jsonResponse(
          {
            error: 'No public game list found. Check your Steam Game Details privacy settings.',
          },
          403
        );
      }

      const games = ownedGames.map((game) => ({
        appId: game.appid,
        title: game.name || `Steam App ${game.appid}`,
        platform: 'PC',
        storeId: 'steam',
        hours:
          Math.round(
            ((game.playtime_forever || 0) / 60) * 10
          ) / 10,
        imageUrl:
          `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`,
      }));

      return jsonResponse({
        steamId,
        total: games.length,
        games,
      });
    } catch {
      return jsonResponse(
        { error: 'Unable to contact Steam. Please try again.' },
        502
      );
    }
  },
};
