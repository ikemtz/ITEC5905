import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { ODataState } from 'imng-kendo-odata';
import { songsFeature } from '../+state/song.reducer';
import { songQueries } from '../+state/song.selectors';
import * as songActionTypes from '../+state/song.actions';
import { ISong } from '../../../../models/artists-webapi';
import { IMediaUploadRequest } from 'apps/itec5905/src/models/media-webapi';

@Injectable()
export class SongCrudFacade implements IDataEntryFacade<ISong> {
  loading$ = this.store.select(songsFeature.selectLoading);
  currentEntity$ = this.store.select(songQueries.selectCurrentSong);
  isEditActive$ = this.store.select(songQueries.selectIsEditSongActive);
  isNewActive$ = this.store.select(songQueries.selectIsNewSongActive);
  albums$ = this.store.select(songsFeature.selectAlbums);
  artists$ = this.store.select(songsFeature.selectArtists);
  genres$ = this.store.select(songsFeature.selectGenres);

  constructor(private readonly store: Store) { }

  public setCurrentEntity(item: ISong): void {
    this.store.dispatch(songActionTypes.setCurrentSong(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(songActionTypes.clearCurrentSong());
  }

  public saveNewEntity(item: ISong, audio?: IMediaUploadRequest, picture?: IMediaUploadRequest): void {
    this.store.dispatch(songActionTypes.saveSongAndMediaRequest({
      song: item,
      audio: audio,
      picture: picture,
    }));
  }

  public updateExistingEntity(item: ISong): void {
    this.store.dispatch(songActionTypes.updateSongRequest(item));
  }

  public loadAlbums(state: ODataState): void {
    this.store.dispatch(songActionTypes.loadAlbumsRequest(state));
  }
  public loadArtists(state: ODataState): void {
    this.store.dispatch(songActionTypes.loadArtistsRequest(state));
  }
  public loadGenres(state: ODataState): void {
    this.store.dispatch(songActionTypes.loadGenresRequest(state));
  }
}
