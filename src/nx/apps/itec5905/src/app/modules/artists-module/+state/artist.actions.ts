import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { IArtist, IArtistUpsertRequest, IPicture } from '../../../../models/artists-webapi';

export const loadArtistsRequest = createPayloadAction<ODataState>(
    '[Artists] Load Artists Request');
export const loadArtistsSuccess = createPayloadAction<ODataResult<IArtist>>(
    '[Artists] Load Artists Success');
export const reloadArtistsRequest = createAction(
    '[Artists] Reload Artists Request');
export const reloadArtistsSuccess = createPayloadAction<ODataResult<IArtist>>(
    '[Artists] Reload Artists Success');

export const clearCurrentArtist = createAction('[Artists] Clear Current Artist');
export const setCurrentArtist = createPayloadAction<IArtist>('[Artists] Set Current Artist');
export const saveArtistRequest = createPayloadAction<IArtistUpsertRequest>('[Artists] Save Artist Request');
export const updateArtistRequest = createPayloadAction<IArtistUpsertRequest>('[Artists] Update Artist Request');
export const deleteArtistRequest = createPayloadAction<IArtistUpsertRequest>('[Artists] Delete Artist Request');

export const loadPicturesRequest = createPayloadAction<ODataState>(
    '[Artists] Load Pictures Request');
export const loadPicturesSuccess = createPayloadAction<ODataResult<IPicture>>(
    '[Artists] Load Pictures Success');
