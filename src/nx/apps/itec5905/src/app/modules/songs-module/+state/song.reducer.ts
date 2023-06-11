import { createReducer, on, createFeature } from '@ngrx/store';
import {
  createKendoODataGridInitialState,
  getODataPagerSettings,
  KendoODataGridState,
} from 'imng-kendo-grid-odata';
import {
  imngEffectError,
  imngEffectErrorReducer,
  findAndModify,
} from 'imng-ngrx-utils';

import {
  IAlbum,
  IArtist,
  IGenre,
  ISong,
} from '../../../../models/artists-webapi';
import * as songActionTypes from './song.actions';
export const SONGS_FEATURE_KEY = 'songs';

export interface State extends KendoODataGridState<ISong> {
  currentSong: ISong | undefined;
  albums: IAlbum[];
  artists: IArtist[];
  genres: IGenre[];
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentSong: undefined,
  albums: [],
  artists: [],
  genres: [],
  loading: true,
};

export const songsFeature = createFeature({
  name: SONGS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(
      songActionTypes.loadSongsRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })
    ),
    on(
      songActionTypes.loadSongsSuccess,
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
      })
    ),
    on(
      songActionTypes.setCurrentSong,
      (state, { payload }): State => ({ ...state, currentSong: payload })
    ),
    on(
      songActionTypes.clearCurrentSong,
      (state): State => ({ ...state, currentSong: undefined })
    ),
    on(
      songActionTypes.saveSongRequest,
      songActionTypes.updateSongRequest,
      songActionTypes.deleteSongRequest,
      songActionTypes.loadAlbumsRequest,
      songActionTypes.loadArtistsRequest,
      (state): State => ({
        ...state,
        loading: true,
      })
    ),
    on(
      songActionTypes.loadAlbumsSuccess,
      (state, { payload }): State => ({
        ...state,
        albums: payload.data,
      })
    ),
    on(
      songActionTypes.loadArtistsSuccess,
      (state, { payload }): State => ({
        ...state,
        artists: payload.data,
      })
    ),
    on(
      songActionTypes.loadGenresSuccess,
      (state, { payload }): State => ({
        ...state,
        genres: payload.data,
      })
    ),
    on(
      songActionTypes.loadSongImageSuccess,
      (state, { payload }): State => ({
        ...state,
        gridData: {
          total: state.gridData.total,
          data: findAndModify(
            state.gridData.data,
            payload.id?.toString(),
            (artist) => (artist.pictureIpfsHash = payload.pictureIpfsHash)
          ),
        },
      })
    ),
    on(imngEffectError, imngEffectErrorReducer)
  ),
});
