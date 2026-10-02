// globalStyles.js
// Shared StyleSheet using only core Flexbox layout rules and theme colors.
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060a11',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  subText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  label: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 16,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  // Branding Header style
  headerBrand: {
    marginBottom: 12,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  brandSubtitle: {
    fontSize: 10,
    color: '#64748b',
    letterSpacing: 1,
  },
  // Summary boxes layout (4 columns)
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 12,
    backgroundColor: '#0c1320',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#182338',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Game Card row style
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0c1320',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: '#182338',
  },
  cover: {
    width: 48,
    height: 68,
    borderRadius: 8,
  },
  coverLarge: {
    width: 150,
    height: 220,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 16,
  },
  coverPlaceholder: {
    backgroundColor: '#182338',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#060a11',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#0c1320',
    borderWidth: 1,
    borderColor: '#182338',
  },
  chipActive: {
    backgroundColor: '#1683ff',
    borderColor: '#1683ff',
  },
  chipText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#182338',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#FFFFFF',
    backgroundColor: '#0c1320',
  },
  button: {
    backgroundColor: '#1683ff',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  dangerButton: {
    backgroundColor: '#F38BA8',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  star: {
    fontSize: 28,
    color: '#F9E2AF',
  },
  errorText: {
    color: '#F38BA8',
    marginTop: 8,
  },
  emptyText: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 30,
  },
});