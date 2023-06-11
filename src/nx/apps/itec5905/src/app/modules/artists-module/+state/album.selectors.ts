import { createSelector } from '@ngrx/store';
import { artistsFeature } from './artist.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditAlbumActive = createSelector(
  artistsFeature.selectCurrentAlbum,
  (entity) => isTruthy(entity?.id));
const selectIsNewAlbumActive = createSelector(
  artistsFeature.selectCurrentAlbum,
  (entity) => isTruthy(entity) && !isTruthy(entity?.id));

export const albumQueries = {
  selectIsEditAlbumActive,
  selectIsNewAlbumActive,
};

