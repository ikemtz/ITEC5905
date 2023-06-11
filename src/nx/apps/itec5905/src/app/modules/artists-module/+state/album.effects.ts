import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { artistsFeature } from './artist.reducer';
import * as albumActionTypes from './album.actions';
import * as artistActionTypes from './artist.actions';
import { environment } from '../../../../environments/environment';

import { AlbumUpsertRequestApiService } from '../album-crud';
import { IAlbum } from 'apps/itec5905/src/models/artists-webapi';
import { MediaApiService } from '../../media-module';

@Injectable()
export class AlbumUpsertRequestEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataService,
    private readonly store: Store,
    private readonly albumUpsertRequestApiService: AlbumUpsertRequestApiService,
    private readonly mediaService: MediaApiService,
  ) { }

  loadAlbumsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(albumActionTypes.loadAlbumsRequest),
      switchMap((action: ReturnType<typeof albumActionTypes.loadAlbumsRequest>) => this.odataService
        .fetch<IAlbum>(environment.endpoints.artistsODataEnpoints.albums, action.payload)
        .pipe(
          map(t => albumActionTypes.loadAlbumsSuccess(t)),
          handleEffectError(action))));
  });

  reloadAlbumsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(artistActionTypes.reloadArtistsRequest),
      concatLatestFrom(() => this.store.select(artistsFeature.selectGridODataState)),
      switchMap(([action, odataState]) => this.odataService
        .fetch<IAlbum>(environment.endpoints.artistsODataEnpoints.artists, odataState, {
          bustCache: true,
        })
        .pipe(
          map(t => artistActionTypes.reloadArtistsSuccess(t)),
          handleEffectError(action))));
  });

  saveAlbumEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(albumActionTypes.saveAlbumRequest),
      switchMap((action: ReturnType<typeof albumActionTypes.saveAlbumRequest>) => this.albumUpsertRequestApiService.post(action.payload).pipe(
        map(() => artistActionTypes.reloadArtistsRequest()),
        handleEffectError(action))));
  });

  saveAlbumAndMediaEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(albumActionTypes.saveAlbumAndMediaRequest),
      switchMap((action: ReturnType<typeof albumActionTypes.saveAlbumAndMediaRequest>) => this.mediaService.post({
        ...action.payload.picture,
        referenceName: action.payload.album.name,
      }).pipe(
        map((mediaResponse) => albumActionTypes.saveAlbumRequest({
          ...action.payload.album,
          pictureType: action.payload.picture?.fileType,
          pictureIpfsHash: mediaResponse.ipfsHash
        })),
        handleEffectError(action))));
  });

  updateAlbumEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(albumActionTypes.updateAlbumRequest),
      switchMap((action: ReturnType<typeof albumActionTypes.updateAlbumRequest>) => this.albumUpsertRequestApiService.put(action.payload.album).pipe(
        map(() => artistActionTypes.reloadArtistsRequest()),
        handleEffectError(action))));
  });

  deleteAlbumEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(albumActionTypes.deleteAlbumRequest),
      switchMap((action: ReturnType<typeof albumActionTypes.deleteAlbumRequest>) => this.albumUpsertRequestApiService.delete(action.payload).pipe(
        map(() => artistActionTypes.reloadArtistsRequest()),
        handleEffectError(action))));
  });
}
