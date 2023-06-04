import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { AlbumProperties, IAlbum, ISong, ISongForm, SongFormGroupFac, SongProperties } from '../../../../models/artists-webapi';

export const loadSongsRequest = createPayloadAction<ODataState>(
    '[Songs] Load Songs Request');
export const loadSongsSuccess = createPayloadAction<ODataResult<ISong>>(
    '[Songs] Load Songs Success');
export const reloadSongsRequest = createAction(
    '[Songs] Reload Songs Request');
export const reloadSongsSuccess = createPayloadAction<ODataResult<ISong>>(
    '[Songs] Reload Songs Success');

export const clearCurrentSong = createAction('[Songs] Clear Current Song');
export const setCurrentSong = createPayloadAction<ISong>('[Songs] Set Current Song');
export const saveSongRequest = createPayloadAction<ISong>('[Songs] Save Song Request');
export const updateSongRequest = createPayloadAction<ISong>('[Songs] Update Song Request');
export const deleteSongRequest = createPayloadAction<ISong>('[Songs] Delete Song Request');

export const loadAlbumsRequest = createPayloadAction<ODataState>(
    '[Songs] Load Albums Request');
export const loadAlbumsSuccess = createPayloadAction<ODataResult<IAlbum>>(
    '[Songs] Load Albums Success');
