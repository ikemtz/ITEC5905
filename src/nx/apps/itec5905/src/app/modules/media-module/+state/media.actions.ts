import {
  IMediaUpdateRequest,
  IMediaUploadRequest,
  IMediaUploadResponse,
} from '../../../../models/media-webapi';
import { createPayloadAction } from 'imng-ngrx-utils';

export const saveMediaRequest = createPayloadAction<IMediaUploadRequest>(
  '[MediaUploadRequests] Save Media Request'
);
export const updateMediaRequest = createPayloadAction<IMediaUpdateRequest>(
  '[MediaUploadRequests] Update Media Request'
);
export const deleteMediaRequest = createPayloadAction<string>(
  '[MediaUploadRequests] Delete Media Request'
);

export const saveMediaResponse = createPayloadAction<IMediaUploadResponse>(
  '[MediaUploadRequests] Save Media Response'
);
export const updateMediaResponse = createPayloadAction<IMediaUploadResponse>(
  '[MediaUploadRequests] Update Media Response'
);
export const deleteMediaResponse = createPayloadAction<IMediaUploadResponse>(
  '[MediaUploadRequests] Delete Media Response'
);
