import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import {
    IAlbum,
    IArtist,
    IGenre,
    ISong,
} from '../../../../models/artists-webapi';
import { ISongUpsert } from '../models/song-upsert';

export const loadSongsRequest = createPayloadAction<ODataState>(
    '[Songs] Load Songs Request'
);
export const loadSongsSuccess = createPayloadAction<ODataResult<ISong>>(
    '[Songs] Load Songs Success'
);
export const reloadSongsRequest = createAction('[Songs] Reload Songs Request');
export const reloadSongsSuccess = createPayloadAction<ODataResult<ISong>>(
    '[Songs] Reload Songs Success'
);
export const loadSongImageSuccess = createPayloadAction<ISong>(
    '[Songs] Load Song Image Success'
)

export const clearCurrentSong = createAction('[Songs] Clear Current Song');
export const setCurrentSong = createPayloadAction<ISong>(
    '[Songs] Set Current Song'
);
export const saveSongAndMediaRequest = createPayloadAction<ISongUpsert>(
    '[Songs] Save Song And Media Request'
);
export const saveSongPictureRequest = createPayloadAction<ISongUpsert>(
    '[Songs] Save Song And Picture Request'
);
export const saveSongRequest = createPayloadAction<ISong>(
    '[Songs] Save Song Request'
);
export const updateSongRequest = createPayloadAction<ISong>(
    '[Songs] Update Song Request'
);
export const deleteSongRequest = createPayloadAction<ISong>(
    '[Songs] Delete Song Request'
);

export const loadAlbumsRequest = createPayloadAction<ODataState>(
    '[Songs] Load Albums Request'
);
export const loadAlbumsSuccess = createPayloadAction<ODataResult<IAlbum>>(
    '[Songs] Load Albums Success'
);
export const loadArtistsRequest = createPayloadAction<ODataState>(
    '[Songs] Load Artists Request'
);
export const loadArtistsSuccess = createPayloadAction<ODataResult<IArtist>>(
    '[Songs] Load Artists Success'
);

export const loadGenresRequest = createPayloadAction<ODataState>(
    '[Songs] Load Genres Request'
);
export const loadGenresSuccess = createPayloadAction<ODataResult<IGenre>>(
    '[Songs] Load Genres Success'
);
