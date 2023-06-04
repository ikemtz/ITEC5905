import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { songsFeature } from './song.reducer';
import * as songActionTypes from './song.actions';
import { environment } from '../../../../environments/environment';

import { AlbumProperties, IAlbum, ISong, ISongForm, SongFormGroupFac, SongProperties } from '../../../../models/artists-webapi';
import { SongApiService } from '../songs-crud';

@Injectable()
export class SongEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataService,
    private readonly store: Store,
    private readonly songApiService: SongApiService,
  ) { }

  loadSongsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.loadSongsRequest),
      switchMap((action: ReturnType<typeof songActionTypes.loadSongsRequest>) => this.odataService
        .fetch<ISong>(environment.endpoints.artistsODataEnpoints.songs, action.payload)
        .pipe(
          map(t => songActionTypes.loadSongsSuccess(t)),
          handleEffectError(action))));
  });

  reloadSongsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.reloadSongsRequest),
      concatLatestFrom(() => this.store.select(songsFeature.selectGridODataState)),
      switchMap(([action, odataState]) => this.odataService
        .fetch<ISong>(environment.endpoints.artistsODataEnpoints.songs, odataState, {
          bustCache: true,
        })
        .pipe(
          map(t => songActionTypes.reloadSongsSuccess(t)),
          handleEffectError(action))));
  });

  saveSongEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.saveSongRequest),
      switchMap((action: ReturnType<typeof songActionTypes.saveSongRequest>) => this.songApiService.post(action.payload).pipe(
        map(() => songActionTypes.reloadSongsRequest()),
        handleEffectError(action))));
  });

  updateSongEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.updateSongRequest),
      switchMap((action: ReturnType<typeof songActionTypes.updateSongRequest>) => this.songApiService.put(action.payload).pipe(
        map(() => songActionTypes.reloadSongsRequest()),
        handleEffectError(action))));
  });

  deleteSongEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.deleteSongRequest),
      switchMap((action: ReturnType<typeof songActionTypes.deleteSongRequest>) => this.songApiService.delete(action.payload).pipe(
        map(() => songActionTypes.reloadSongsRequest()),
        handleEffectError(action))));
  });

  loadAlbumsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.loadAlbumsRequest),
      switchMap((action: ReturnType<typeof songActionTypes.loadAlbumsRequest>) => this.odataService
        .fetch<IAlbum>(environment.endpoints.artistsODataEnpoints.albums, action.payload)
        .pipe(map(t => songActionTypes.loadAlbumsSuccess(t)),
          handleEffectError(action))));
  });
}
