import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { concatAll, map, switchMap } from 'rxjs/operators';

import { songsFeature } from './song.reducer';
import * as songActionTypes from './song.actions';
import { environment } from '../../../../environments/environment';
import { ImageApiService, MediaApiService } from '../../media-module';

import {
  IAlbum,
  IArtist,
  IGenre,
  ISong,
} from '../../../../models/artists-webapi';
import { SongApiService } from '../songs-crud';
import { of } from 'rxjs';

@Injectable()
export class SongEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataService,
    private readonly store: Store,
    private readonly songApiService: SongApiService,
    private readonly imageApiService: ImageApiService,
    private readonly mediaService: MediaApiService,
  ) { }

  loadSongsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.loadSongsRequest),
      switchMap((action: ReturnType<typeof songActionTypes.loadSongsRequest>) =>
        this.odataService
          .fetch<ISong>(
            environment.endpoints.artistsODataEnpoints.songs,
            action.payload
          )
          .pipe(
            map((t) => songActionTypes.loadSongsSuccess(t)),
            handleEffectError(action)
          )
      )
    );
  });

  reloadSongsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.reloadSongsRequest),
      concatLatestFrom(() =>
        this.store.select(songsFeature.selectGridODataState)
      ),
      switchMap(([action, odataState]) =>
        this.odataService
          .fetch<ISong>(
            environment.endpoints.artistsODataEnpoints.songs,
            odataState,
            {
              bustCache: true,
            }
          )
          .pipe(
            map((t) => songActionTypes.reloadSongsSuccess(t)),
            handleEffectError(action)
          )
      )
    );
  });

  saveSongEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.saveSongRequest),
      switchMap((action: ReturnType<typeof songActionTypes.saveSongRequest>) =>
        this.songApiService.post(action.payload).pipe(
          map(() => songActionTypes.reloadSongsRequest()),
          handleEffectError(action)
        )
      )
    );
  });

  updateSongEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.updateSongRequest),
      switchMap(
        (action: ReturnType<typeof songActionTypes.updateSongRequest>) =>
          this.songApiService.put(action.payload).pipe(
            map(() => songActionTypes.reloadSongsRequest()),
            handleEffectError(action)
          )
      )
    );
  });

  deleteSongEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.deleteSongRequest),
      switchMap(
        (action: ReturnType<typeof songActionTypes.deleteSongRequest>) =>
          this.songApiService.delete(action.payload).pipe(
            map(() => songActionTypes.reloadSongsRequest()),
            handleEffectError(action)
          )
      )
    );
  });

  loadAlbumsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.loadAlbumsRequest),
      switchMap(
        (action: ReturnType<typeof songActionTypes.loadAlbumsRequest>) =>
          this.odataService
            .fetch<IAlbum>(
              environment.endpoints.artistsODataEnpoints.albums,
              action.payload
            )
            .pipe(
              map((t) => songActionTypes.loadAlbumsSuccess(t)),
              handleEffectError(action)
            )
      )
    );
  });

  loadArtistsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.loadArtistsRequest),
      switchMap(
        (action: ReturnType<typeof songActionTypes.loadArtistsRequest>) =>
          this.odataService
            .fetch<IArtist>(
              environment.endpoints.artistsODataEnpoints.artists,
              action.payload
            )
            .pipe(
              map((t) => songActionTypes.loadArtistsSuccess(t)),
              handleEffectError(action)
            )
      )
    );
  });

  loadGenresEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.loadGenresRequest),
      switchMap(
        (action: ReturnType<typeof songActionTypes.loadGenresRequest>) =>
          this.odataService
            .fetch<IGenre>(
              environment.endpoints.artistsODataEnpoints.genres,
              action.payload
            )
            .pipe(
              map((t) => songActionTypes.loadGenresSuccess(t)),
              handleEffectError(action)
            )
      )
    );
  });

  saveSongAudioffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.saveSongAndMediaRequest),
      switchMap((action: ReturnType<typeof songActionTypes.saveSongAndMediaRequest>) => this.mediaService.post({
        ...action.payload.audio,
        referenceName: action.payload.song.name,
      }).pipe(
        map((mediaResponse) => songActionTypes.saveSongPictureRequest({
          ...action.payload,
          song: {
            ...action.payload.song,
            ipfsHash: mediaResponse.ipfsHash
          }
        })),
        handleEffectError(action))));
  });

  saveSongPictureffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.saveSongPictureRequest),
      switchMap((action: ReturnType<typeof songActionTypes.saveSongPictureRequest>) => this.mediaService.post({
        ...action.payload.picture,
        referenceName: action.payload.song.name,
      }).pipe(
        map((mediaResponse) => songActionTypes.saveSongRequest({
          ...action.payload.song,
          pictureIpfsHash: mediaResponse.ipfsHash,
        })),
        handleEffectError(action))));
  });

  loadImageEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(songActionTypes.loadSongsSuccess),
      switchMap((action: ReturnType<typeof songActionTypes.loadSongsSuccess>) =>
        of(...action.payload.data.map(artist =>
          this.imageApiService.get(artist.pictureIpfsHash, artist.pictureType)
            .pipe(map(image => ({ id: artist.id, pictureIpfsHash: image })))
        ))
          .pipe(
            concatAll(),
            map(t => songActionTypes.loadSongImageSuccess(t)),
            handleEffectError(action))));
  });
}
