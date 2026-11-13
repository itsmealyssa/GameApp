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
  const coverStyle = large ? styles.coverLarge : styles.cover;

  useEffect(() => {
    setImageFailed(false);
  }, [game?.id, game?.imageUrl, game?.imageAsset]);

  if (game?.imageUrl && !imageFailed) {
    return (
      <Image
        accessibilityLabel={`${game.title} cover`}
        resizeMode={'cover'}
        source={{ uri: game.imageUrl }}
        style={coverStyle}
        onError={() => setImageFailed(true)}
      />
    );
  }

  const localSource = !imageFailed && game?.imageAsset ? localCovers[game.imageAsset] : null;
  if (localSource) {
    return (
      <Image
        accessibilityLabel={`${game.title} cover`}
        resizeMode={'cover'}
        source={localSource}
        style={coverStyle}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <View style={[coverStyle, styles.coverPlaceholder]} accessibilityLabel={'No cover image'}>
      <Text style={{ fontSize: large ? 48 : 20 }}>🎮</Text>
    </View>
  );
}
