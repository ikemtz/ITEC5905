import { createSelector } from '@ngrx/store';
import { artistsFeature } from './artist.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditArtistActive = createSelector(
  artistsFeature.selectCurrentArtist,
  (entity) => isTruthy(entity?.id));
const selectIsNewArtistActive = createSelector(
  artistsFeature.selectCurrentArtist,
  (entity) => isTruthy(entity) && !isTruthy(entity?.id));
export const dataEntryArtistQueries = {
  selectCurrentArtist: artistsFeature.selectCurrentArtist,
  selectIsEditArtistActive,
  selectIsNewArtistActive,
};

export const artistQueries = { ...dataEntryArtistQueries };

