import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import * as mediaUploadRequestActionTypes from './media.actions';
import { MediaApiService } from '../media.service';


@Injectable()
export class MediaUploadRequestEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly mediaApiService: MediaApiService,
  ) { }


  saveMediaUploadRequestEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mediaUploadRequestActionTypes.saveMediaRequest),
      switchMap((action: ReturnType<typeof mediaUploadRequestActionTypes.saveMediaRequest>) => this.mediaApiService.post(action.payload).pipe(
        map((response) => mediaUploadRequestActionTypes.saveMediaResponse(response)),
        handleEffectError(action))));
  });

  updateMediaUploadRequestEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mediaUploadRequestActionTypes.updateMediaRequest),
      switchMap((action: ReturnType<typeof mediaUploadRequestActionTypes.updateMediaRequest>) => this.mediaApiService.put(action.payload).pipe(
        map((response) => mediaUploadRequestActionTypes.updateMediaResponse(response)),
        handleEffectError(action))));
  });

  deleteMediaUploadRequestEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(mediaUploadRequestActionTypes.deleteMediaRequest),
      switchMap((action: ReturnType<typeof mediaUploadRequestActionTypes.deleteMediaRequest>) => this.mediaApiService.delete(action.payload).pipe(
        map((response) => mediaUploadRequestActionTypes.deleteMediaResponse(response)),
        handleEffectError(action))));
  });
}
