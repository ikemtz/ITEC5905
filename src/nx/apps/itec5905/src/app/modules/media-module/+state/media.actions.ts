import { IMediaUpdateRequest, IMediaUploadRequest, IMediaUploadResponse } from '../../../../models/media-webapi';
import { createPayloadAction } from 'imng-ngrx-utils';

export const saveMediaRequest = createPayloadAction<IMediaUploadRequest>('[MediaUploadRequests] Save MediaUploadRequest Request');
export const updateMediaRequest = createPayloadAction<IMediaUpdateRequest>('[MediaUploadRequests] Update MediaUploadRequest Request');
export const deleteMediaRequest = createPayloadAction<string>('[MediaUploadRequests] Delete MediaUploadRequest Request');

export const saveMediaResponse = createPayloadAction<IMediaUploadResponse>('[MediaUploadRequests] Save MediaUploadRequest Response');
export const updateMediaResponse = createPayloadAction<IMediaUploadResponse>('[MediaUploadRequests] Update MediaUploadRequest Response');
export const deleteMediaResponse = createPayloadAction<IMediaUploadResponse>('[MediaUploadRequests] Delete MediaUploadRequest Response');

