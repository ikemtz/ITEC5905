import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';

import { AlbumProperties, IAlbum, ISong, ISongForm, SongFormGroupFac, SongProperties } from '../../../../models/artists-webapi';
import * as songActionTypes from './song.actions';
export const SONGS_FEATURE_KEY = 'songs';

export interface State extends KendoODataGridState<ISong> {
  currentSong: ISong | undefined;
  albums: IAlbum[];
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentSong: undefined,
  albums: [],
  loading: true,
};

export const songsFeature = createFeature({
  name: SONGS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(songActionTypes.loadSongsRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })),
    on(songActionTypes.loadSongsSuccess,
      songActionTypes.reloadSongsSuccess,
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
    on(songActionTypes.setCurrentSong,
      (state, { payload }): State =>
        ({ ...state, currentSong: payload })),
    on(songActionTypes.clearCurrentSong,
      (state): State => ({ ...state, currentSong: undefined })),
    on(songActionTypes.saveSongRequest,
      songActionTypes.updateSongRequest,
      songActionTypes.deleteSongRequest,
      (state): State => ({
        ...state,
        loading: true,
      })),
    on(songActionTypes.loadAlbumsSuccess,
      (state, { payload }): State => ({
        ...state,
        albums: payload.data
      })),
    on(imngEffectError, imngEffectErrorReducer),
  )
});
