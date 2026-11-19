
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from './globalStyles';
import { getStoreName } from './data';
import GameCover from './GameCover';

export default function StoreLibraryScreen({
  route,
  navigation,
  games = [],
}) {
  const { storeId } = route.params;

  const storeName = getStoreName(storeId);

  const storeGames = games.filter(
    (game) => game.storeId === storeId
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {storeName}
      </Text>

      <Text style={styles.subText}>
        Your {storeName} game collection.
      </Text>

      <Text style={[styles.label, { marginTop: 16 }]}>
        {storeGames.length}{' '}
        {storeGames.length === 1 ? 'Game' : 'Games'} in Library
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
      >
        {storeGames.length === 0 ? (
          <View style={[styles.card, { padding: 20 }]}>
            <Text style={styles.text}>
              No games in this library yet.
            </Text>

            <Text style={styles.subText}>
              Add a game and assign it to {storeName}.
            </Text>
          </View>
        ) : (
          storeGames.map((game) => (
            <TouchableOpacity
              key={game.id}
              accessibilityRole="button"
              activeOpacity={0.8}
              style={[
                styles.card,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 12,
                  marginBottom: 12,
                },
              ]}
              onPress={() =>
                navigation.navigate('Details', {
                  gameId: game.id,
                })
              }
            >
              <GameCover game={game} />

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.text}>
                  {game.title}
                </Text>

                <Text style={styles.subText}>
                  Platform: {game.platform}
                </Text>

                <Text style={styles.subText}>
                  {game.status} • {game.hours} hours
                </Text>

                <Text style={styles.star}>
                  {'★'.repeat(game.rating)}
                  {'☆'.repeat(5 - game.rating)}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
