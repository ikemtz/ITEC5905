import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { concatAll, map, switchMap } from 'rxjs/operators';
import { artistsFeature } from './artist.reducer';
import * as artistActionTypes from './artist.actions';
import { environment } from '../../../../environments/environment';
import { IArtist, } from '../../../../models/artists-webapi';
import { ArtistApiService } from '../artists-crud';
import { ImageApiService, MediaApiService } from '../../media-module';
import { of } from 'rxjs';

@Injectable()
export class ArtistEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataService,
    private readonly store: Store,
    private readonly artistApiService: ArtistApiService,
    private readonly mediaService: MediaApiService,
    private readonly imageApiService: ImageApiService,
  ) { }

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
          map(t => artistActionTypes.loadArtistsSuccess(t)),
          handleEffectError(action))));
  });


  loadArtistsSuccessEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActionTypes.loadArtistsSuccess),
      switchMap((action: ReturnType<typeof artistActionTypes.loadArtistsSuccess>) =>
        of(...action.payload.data.map(artist =>
          this.imageApiService.get(artist.pictureIpfsHash, artist.pictureType)
            .pipe(map(image => ({ id: artist.id, pictureIpfsHash: `${artist.pictureType},${image}` })))
        ))
          .pipe(
            concatAll(),
            map(t => artistActionTypes.loadArtistImageSuccess(t)),
            handleEffectError(action))));
  });

  saveArtistAndMediaEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActionTypes.saveArtistAndMediaRequest),
      switchMap((action: ReturnType<typeof artistActionTypes.saveArtistAndMediaRequest>) => this.mediaService.post({
        ...action.payload.picture,
        referenceName: action.payload.artist.name,
      }).pipe(
        map((mediaResponse) => artistActionTypes.saveArtistRequest({
          ...action.payload.artist,
          pictureType: action.payload.picture?.fileType,
          pictureIpfsHash: mediaResponse.ipfsHash
        })),
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
      switchMap((action: ReturnType<typeof artistActionTypes.updateArtistRequest>) => this.artistApiService.put(action.payload.artist).pipe(
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

}
