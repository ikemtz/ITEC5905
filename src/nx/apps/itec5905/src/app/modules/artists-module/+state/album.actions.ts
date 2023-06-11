import { createAction } from '@ngrx/store';
import { IAlbumUpsertRequest } from 'apps/itec5905/src/models/artists-webapi';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { IAlbumUpsert } from '../models/album-upsert';

export const loadAlbumsRequest = createPayloadAction<ODataState>(
    '[Artists] Load Albums Request'
);
export const loadAlbumsSuccess = createPayloadAction<
    ODataResult<IAlbumUpsertRequest>
>('[Artists] Load Albums Success');

export const clearCurrentAlbumRequest = createAction(
    '[Artists] Clear Current Album'
);
export const setCurrentAlbumRequest = createPayloadAction<IAlbumUpsertRequest>(
    '[Artists] Set Current Album Request'
);
export const saveAlbumRequest = createPayloadAction<IAlbumUpsertRequest>(
    '[Artists] Save Album Request'
);
export const saveAlbumAndMediaRequest = createPayloadAction<IAlbumUpsert>(
    '[Artists] Save Album And Media Request'
);
export const updateAlbumRequest = createPayloadAction<IAlbumUpsert>(
    '[Artists] Update Album Request'
);
export const deleteAlbumRequest = createPayloadAction<IAlbumUpsertRequest>(
    '[Artists] Delete Album Request'
);
