
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
      {/* STORE TITLE */}
      <Text style={styles.title}>
        {storeName}
      </Text>

      <Text style={styles.subText}>
        Your {storeName} game collection.
      </Text>

      {/* LIBRARY COUNT */}
      <Text style={[styles.label, { marginTop: 16 }]}>
        {storeGames.length}{' '}
        {storeGames.length === 1 ? 'Game' : 'Games'} in Library
      </Text>

      {/* GAME LIBRARY */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: 24,
        }}
      >
        {storeGames.length === 0 ? (
          /* EMPTY LIBRARY MESSAGE */
          <View
            style={[
              styles.card,
              {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: 20,
                width: '100%',
                gap: 8,
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  width: '100%',
                  flexWrap: 'wrap',
                },
              ]}
            >
              No games in this library yet.
            </Text>

            <Text
              style={[
                styles.subText,
                {
                  width: '100%',
                  flexWrap: 'wrap',
                  lineHeight: 20,
                },
              ]}
            >
              Add a game and assign it to {storeName}.
            </Text>
          </View>
        ) : (
          /* GAME LIST */
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

              <View
                style={{
                  flex: 1,
                  marginLeft: 12,
                }}
              >
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
