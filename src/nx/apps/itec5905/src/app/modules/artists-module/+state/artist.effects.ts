import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { artistsFeature } from './artist.reducer';
import * as artistActionTypes from './artist.actions';
import { environment } from '../../../../environments/environment';
import { ArtistProperties, IArtist, IPicture, PictureProperties } from '../../../../models/artists-od';

import { ArtistApiService } from '../artists-crud';

@Injectable()
export class ArtistEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataService,
    private readonly store: Store,
    private readonly artistApiService : ArtistApiService,
  ) {}

  loadArtistsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActionTypes.loadArtistsRequest),
      switchMap((action: ReturnType<typeof artistActionTypes.loadArtistsRequest>) => this.odataService
        .fetch<IArtist>(environment.endpoints.artistsODataEnpoints.artists, action.payload)
        .pipe(
          map(t => artistActionTypes.loadArtistsSuccess(t)),
          handleEffectError(action))));
  });

  reloadArtistsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActionTypes.reloadArtistsRequest),
      concatLatestFrom(() => this.store.select(artistsFeature.selectGridODataState)),
      switchMap(([action, odataState]) => this.odataService
        .fetch<IArtist>(environment.endpoints.artistsODataEnpoints.artists, odataState, {
          bustCache: true,
        })
        .pipe(
          map(t => artistActionTypes.reloadArtistsSuccess(t)),
          handleEffectError(action))));
  });

  saveArtistEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActionTypes.saveArtistRequest),
      switchMap((action: ReturnType<typeof artistActionTypes.saveArtistRequest>) => this.artistApiService.post(action.payload).pipe(
        map(() => artistActionTypes.reloadArtistsRequest()),
        handleEffectError(action))));
  });

  updateArtistEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActionTypes.updateArtistRequest),
      switchMap((action: ReturnType<typeof artistActionTypes.updateArtistRequest>) => this.artistApiService.put(action.payload).pipe(
        map(() => artistActionTypes.reloadArtistsRequest()),
        handleEffectError(action))));
  });

  deleteArtistEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActionTypes.deleteArtistRequest),
      switchMap((action: ReturnType<typeof artistActionTypes.deleteArtistRequest>) => this.artistApiService.delete(action.payload).pipe(
        map(() => artistActionTypes.reloadArtistsRequest()),
        handleEffectError(action))));
  });

  loadPicturesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActionTypes.loadPicturesRequest),
      switchMap((action: ReturnType<typeof artistActionTypes.loadPicturesRequest>) => this.odataService
        .fetch<IPicture>(environment.endpoints.artistsODataEnpoints.pictures, action.payload)
        .pipe(map(t => artistActionTypes.loadPicturesSuccess(t)),
          handleEffectError(action))));
  });
}
