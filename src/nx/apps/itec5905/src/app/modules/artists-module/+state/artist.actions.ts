import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { IArtist, IArtistUpsertRequest, IGenre } from '../../../../models/artists-webapi';
import { IArtistUpsert } from '../models/artist-upsert';

export const loadArtistsRequest = createPayloadAction<ODataState>(
    '[Artists] Load Artists Request');
export const loadArtistsSuccess = createPayloadAction<ODataResult<IArtist>>(
    '[Artists] Load Artists Success');
export const reloadArtistsRequest = createAction(
    '[Artists] Reload Artists Request');
export const reloadArtistsSuccess = createPayloadAction<ODataResult<IArtist>>(
    '[Artists] Reload Artists Success');
export const loadArtistImageSuccess = createPayloadAction<IArtist>(
    '[Artists] Load Artist Image Success'
)
export const clearCurrentArtist = createAction('[Artists] Clear Current Artist');
export const setCurrentArtist = createPayloadAction<IArtist>('[Artists] Set Current Artist');
export const saveArtistAndMediaRequest = createPayloadAction<IArtistUpsert>('[Artists] Save Artist And Media Request');
export const saveArtistRequest = createPayloadAction<IArtistUpsertRequest>('[Artists] Save Artist Request');
export const updateArtistRequest = createPayloadAction<IArtistUpsert>('[Artists] Update Artist Request');
export const deleteArtistRequest = createPayloadAction<IArtist>('[Artists] Delete Artist Request');

export const loadPicturesRequest = createPayloadAction<ODataState>(
    '[Artists] Load Pictures Request');

export const loadGenresRequest = createPayloadAction<ODataState>(
    '[Artistss] Load Genres Request');
export const loadGenresSuccess = createPayloadAction<ODataResult<IGenre>>(
    '[Artistss] Load Genres Success');