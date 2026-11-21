
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  // ==========================================
  // MAIN SCREEN LAYOUT
  // FILE: globalStyles.js
  // USED BY: All screens
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: '#060a11',
    padding: 16,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // ==========================================
  // TITLES AND TEXT
  // FILE: globalStyles.js
  // USED BY: HomeScreen.js, BacklogScreen.js,
  // DetailsScreen.js, StoreLibraryScreen.js
  // ==========================================

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

  helperText: {
    fontSize: 12,
    color: '#7f8da6',
    lineHeight: 18,
    marginTop: 8,
  },

  label: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 16,
    marginBottom: 6,
  },

  // ==========================================
  // HEADER AND BRANDING
  // FILE: globalStyles.js
  // USED BY: HomeScreen.js
  // ==========================================

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

  // ==========================================
  // DASHBOARD STATISTICS
  // FILE: globalStyles.js
  // USED BY: HomeScreen.js
  // ==========================================

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

  // ==========================================
  // GAME CARDS
  // FILE: globalStyles.js
  // USED BY: HomeScreen.js, BacklogScreen.js,
  // StoreLibraryScreen.js
  // ==========================================

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

  catalogCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0c1320',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: '#182338',
  },

  cardInfo: {
    flex: 1,
  },

  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },

  // ==========================================
  // GAME COVER IMAGES
  // FILE: globalStyles.js
  // COMPONENT: GameCover.js
  // USED BY: HomeScreen.js, BacklogScreen.js,
  // StoreLibraryScreen.js, DetailsScreen.js
  //
  // EDIT THESE VALUES TO RESIZE GAME COVERS:
  // cover      = Small game covers
  // coverLarge = Large cover in DetailsScreen
  // ==========================================

  cover: {
    width: 48,
    height: 68,
    borderRadius: 8,
  },

  coverLarge: {
    width: 300,
    height: 420,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 8,
  },

  coverPlaceholder: {
    backgroundColor: '#182338',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  // ==========================================
  // STATUS BADGES
  // FILE: globalStyles.js
  // USED BY: HomeScreen.js, BacklogScreen.js,
  // DetailsScreen.js
  // ==========================================

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

  // ==========================================
  // FILTERS AND STORE OPTIONS
  // FILE: globalStyles.js
  // USED BY: HomeScreen.js, BacklogScreen.js,
  // DetailsScreen.js
  // ==========================================

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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

  // ==========================================
  // INPUT FIELDS AND SEARCH
  // FILE: globalStyles.js
  // USED BY: HomeScreen.js, GameSearchScreen.js
  // ==========================================

  input: {
    borderWidth: 1,
    borderColor: '#182338',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#FFFFFF',
    backgroundColor: '#0c1320',
  },

  searchInput: {
    marginTop: 14,
  },

  // ==========================================
  // BUTTONS
  // FILE: globalStyles.js
  // USED BY: Multiple screens
  // ==========================================

  button: {
    backgroundColor: '#1683ff',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },

  secondaryButton: {
    backgroundColor: '#0c1320',
    borderWidth: 1,
    borderColor: '#26344c',
  },

  smallButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#1683ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 9,
    marginTop: 8,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  dangerButton: {
    backgroundColor: '#F38BA8',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  // ==========================================
  // GAME RATINGS
  // FILE: globalStyles.js
  // USED BY: DetailsScreen.js
  // ==========================================

  star: {
    fontSize: 28,
    color: '#F9E2AF',
  },

  // ==========================================
  // ERRORS AND NOTIFICATIONS
  // FILE: globalStyles.js
  // USED BY: Multiple screens
  // ==========================================

  errorText: {
    color: '#F38BA8',
    marginTop: 8,
    lineHeight: 20,
  },

  notice: {
    backgroundColor: '#111b2b',
    borderColor: '#26344c',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },

  noticeText: {
    color: '#cbd5e1',
    lineHeight: 20,
  },

  emptyText: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 30,
    lineHeight: 20,
  },

  // ==========================================
  // LOADING SCREEN
  // FILE: globalStyles.js
  // USED BY: Loading and startup screens
  // ==========================================

  loadingScreen: {
    flex: 1,
    backgroundColor: '#060a11',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 18,
  },

});
