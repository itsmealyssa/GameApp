// globalStyles.js
// One external StyleSheet shared by every screen (Flexbox only).
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Main wrapper for every screen
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  subText: {
    fontSize: 13,
    color: '#A6ADC8',
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    color: '#A6ADC8',
    marginTop: 16,
    marginBottom: 6,
  },

  // Flex row that places items side-by-side
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  // Summary boxes at the top of Home
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#313244',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  // One game row in the FlatList
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#313244',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    gap: 10,
  },
  // Small cover on the list, big cover on Details
  cover: {
    width: 50,
    height: 75,
    borderRadius: 6,
  },
  coverLarge: {
    width: 160,
    height: 240,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 16,
  },
  // Shown when a game has no picture (games added with the form)
  coverPlaceholder: {
    backgroundColor: '#45475A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },

  // Small colored status label
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E1E2E',
  },

  // Selectable option buttons (filters, statuses)
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#45475A',
  },
  chipActive: {
    backgroundColor: '#89B4FA',
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: '#45475A',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#313244',
  },

  // Big main button
  button: {
    backgroundColor: '#89B4FA',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  dangerButton: {
    backgroundColor: '#F38BA8',
  },
  buttonText: {
    color: '#1E1E2E',
    fontSize: 16,
    fontWeight: 'bold',
  },

  star: {
    fontSize: 32,
    color: '#F9E2AF',
  },
  errorText: {
    color: '#F38BA8',
    marginTop: 10,
  },
  emptyText: {
    color: '#A6ADC8',
    textAlign: 'center',
    marginTop: 30,
  },
});
