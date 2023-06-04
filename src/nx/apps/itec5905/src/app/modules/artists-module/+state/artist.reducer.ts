import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer, findAndModify } from 'imng-ngrx-utils';
import { IArtist, IGenre } from '../../../../models/artists-webapi';

import * as artistActionTypes from './artist.actions';
export const ARTISTS_FEATURE_KEY = 'artists';

export interface State extends KendoODataGridState<IArtist> {
  currentArtist: IArtist | undefined;
  genres: IGenre[];
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentArtist: undefined,
  loading: true,
  genres: [],
};

export const artistsFeature = createFeature({
  name: ARTISTS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(artistActionTypes.loadArtistsRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })),
    on(artistActionTypes.loadArtistsSuccess,
      artistActionTypes.reloadArtistsSuccess,
      (state, { payload }): State => ({
        ...state,
        loading: false,
        gridPagerSettings: getODataPagerSettings({
          gridData: payload,
          gridODataState: state.gridODataState,
        }),
        gridData: payload,
        error: null,
      })),
    on(artistActionTypes.setCurrentArtist,
      (state, { payload }): State =>
        ({ ...state, currentArtist: payload })),
    on(artistActionTypes.clearCurrentArtist,
      (state): State => ({ ...state, currentArtist: undefined })),
    on(artistActionTypes.saveArtistRequest,
      artistActionTypes.updateArtistRequest,
      artistActionTypes.deleteArtistRequest,
      (state): State => ({
        ...state,
        loading: true,
      })),
    on(artistActionTypes.loadArtistImageSuccess, (state, { payload }): State => ({
      ...state,
      gridData: { total: state.gridData.total, data: findAndModify(state.gridData.data, payload.id?.toString(), artist => artist.pictureIpfsHash = payload.pictureIpfsHash) }
    })),
    on(artistActionTypes.loadGenresSuccess,
      (state, { payload }): State => ({
        ...state,
        genres: payload.data
      })),
    on(imngEffectError, imngEffectErrorReducer),
  )
});
