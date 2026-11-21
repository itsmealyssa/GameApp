
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './globalStyles';

const localCovers = {
  cyberpunk2077: require('./assets/covers/cyberpunk2077.jpg'),
  battlefield6: require('./assets/covers/battlefield6.jpg'),
  thefinals: require('./assets/covers/thefinals.jpg'),
  apexlegends: require('./assets/covers/apexlegends.jpg'),
};

export default function GameCover({ game, large = false }) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [game?.id, game?.imageUrl, game?.imageAsset]);

  // Normalize source to handle RAWG, rawg, Steam, etc.
  const source = String(game?.source || '').toLowerCase();
  const gameId = String(game?.id || '').toLowerCase();

  const isImported =
    source === 'steam' ||
    source === 'rawg' ||
    Number(game?.steamAppId) > 0 ||
    gameId.startsWith('steam-') ||
    gameId.startsWith('rawg-');

  // Preserve existing image dimensions.
  const coverStyle = isImported && large
    ? styles.coverImported
    : large
      ? styles.coverLarge
      : styles.cover;

  // Online image
  if (game?.imageUrl && !imageFailed) {
    return (
      <Image
        accessibilityLabel={`${game.title} cover`}
        resizeMode="contain"
        source={{ uri: game.imageUrl }}
        style={coverStyle}
        onError={() => setImageFailed(true)}
      />
    );
  }

  // Local image
  const localSource =
    !imageFailed && game?.imageAsset
      ? localCovers[game.imageAsset]
      : null;

  if (localSource) {
    return (
      <Image
        accessibilityLabel={`${game.title} cover`}
        resizeMode="contain"
        source={localSource}
        style={coverStyle}
        onError={() => setImageFailed(true)}
      />
    );
  }

  // Placeholder
  return (
    <View
      style={[coverStyle, styles.coverPlaceholder]}
      accessibilityLabel="No cover image"
    >
      <Text style={{ fontSize: isImported ? 64 : large ? 48 : 20 }}>
        🎮
      </Text>
    </View>
  );
}
