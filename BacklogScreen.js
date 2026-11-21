
import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from './globalStyles';
import { getStatusColor, getStars } from './data';
import GameCover from './GameCover';

export default function BacklogScreen({ navigation, games }) {
  const backlogGames = games.filter(
    (game) => game.status === 'Backlog'
  );

  return (
    <View style={styles.container}>

      {/* CENTERED GAMEVAULT HEADER */}
      <View
        style={[
          styles.headerBrand,
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginBottom: 14,
          },
        ]}
      >
        {/* PIXEL-STYLE LOGO */}
        <Text
          style={[
            styles.brandTitle,
            {
              fontFamily: 'PressStart2P',
              fontSize: 20,
              color: '#60A5FA',
              textAlign: 'center',
              textShadowColor: '#8B5CF6',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 3,
            },
          ]}
        >
          GAMEVAULT
        </Text>

        {/* ORIGINAL SUBTITLE */}
        <Text
          style={[
            styles.brandSubtitle,
            {
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 1.8,
              color: '#CBD5E1',
              textAlign: 'center',
              marginTop: 6,
            },
          ]}
        >
          COLLECT • PLAY • TRACK • REPEAT
        </Text>
      </View>

      <Text style={styles.title}>Backlog</Text>

      <Text style={styles.subText}>
        {backlogGames.length} games waiting to be played
      </Text>

      {backlogGames.length === 0 ? (
        <Text style={styles.emptyText}>
          No backlog games here yet.
        </Text>
      ) : (
        <FlatList
          data={backlogGames}
          keyExtractor={(game) => game.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('Details', {
                  gameId: item.id,
                })
              }
            >
              <GameCover game={item} />

              <View style={styles.cardInfo}>
                <Text style={styles.text}>
                  {item.title}
                </Text>

                <Text style={styles.subText}>
                  {item.platform}
                </Text>

                <Text
                  style={{
                    color: '#F9E2AF',
                    fontSize: 12,
                    marginTop: 3,
                  }}
                >
                  {item.rating > 0
                    ? getStars(item.rating)
                    : 'Not rated'}
                </Text>
              </View>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: getStatusColor(item.status),
                  },
                ]}
              >
                <Text style={styles.badgeText}>
                  {item.status}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
