import { createReducer, on, createFeature } from '@ngrx/store';
import { imngEffectError } from 'imng-ngrx-utils';
import * as mediaUploadRequestActionTypes from './media.actions';
export const MEDIA_KEY = 'media';

export interface State {
  activeOperations: number;
  error: Error | undefined;
}

export const initialState: State = {
  activeOperations: 0,
  error: undefined,
};

export const mediaFeature = createFeature({
  name: MEDIA_KEY,
  reducer: createReducer(
    initialState,

    on(mediaUploadRequestActionTypes.saveMediaRequest,
      mediaUploadRequestActionTypes.updateMediaRequest,
      mediaUploadRequestActionTypes.deleteMediaRequest,
      (state): State => ({
        ...state,
        activeOperations: state.activeOperations++,
      })),
    on(mediaUploadRequestActionTypes.saveMediaResponse,
      mediaUploadRequestActionTypes.updateMediaResponse,
      mediaUploadRequestActionTypes.deleteMediaResponse,
      (state): State => ({
        ...state,
        activeOperations: state.activeOperations--,
      })),
    on(imngEffectError, (state, action): State => ({
      ...state,
      activeOperations: state.activeOperations--,
      error: action.payload.error
    })),
  )
});
