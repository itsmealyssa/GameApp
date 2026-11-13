import assert from 'node:assert/strict';
import test from 'node:test';
import { getCollectionStats, initialGames, normalizeGame, normalizeGames } from './data.js';

test('seed collection statistics are derived from actual game records', () => {
  assert.deepEqual(getCollectionStats(initialGames), {
    total: 4,
    completed: 1,
    playing: 2,
    backlog: 1,
    totalHours: 170,
    completionRate: 25,
    averageRating: '4.0',
    platformCount: 2,
  });
});

test('normalization rejects blank titles and clamps invalid values', () => {
  assert.equal(normalizeGame({ title: '   ' }), null);
  assert.deepEqual(normalizeGame({ id: 42, title: ' Portal 2 ', rating: 9, hours: -5, status: 'Unknown' }), {
    id: '42',
    title: 'Portal 2',
    platform: 'Unknown',
    status: 'Backlog',
    rating: 5,
    hours: 0,
  });
});

test('normalization preserves a valid remote cover URL', () => {
  assert.equal(normalizeGame({ title: 'Game', imageUrl: ' https://example.com/cover.jpg ' }).imageUrl, 'https://example.com/cover.jpg');
});

test('invalid and missing list entries are safely discarded', () => {
  assert.deepEqual(normalizeGames([null, {}, { title: 'Valid Game' }]).map((game) => game.title), ['Valid Game']);
  assert.equal(getCollectionStats([]).completionRate, 0);
});
