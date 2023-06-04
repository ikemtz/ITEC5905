import { createSelector } from '@ngrx/store';
import { songsFeature } from './song.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditSongActive = createSelector(
  songsFeature.selectCurrentSong,
  (entity) => isTruthy(entity?.id));
const selectIsNewSongActive = createSelector(
  songsFeature.selectCurrentSong,
  (entity) => isTruthy(entity) && !isTruthy(entity?.id));
export const dataEntrySongQueries = {
  selectCurrentSong: songsFeature.selectCurrentSong,
  selectIsEditSongActive,
  selectIsNewSongActive,
};

export const songQueries = { ...dataEntrySongQueries };

