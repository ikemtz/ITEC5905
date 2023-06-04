import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { ODataState } from 'imng-kendo-odata';
import { songsFeature } from '../+state/song.reducer';
import { songQueries } from '../+state/song.selectors';
import * as songActionTypes from '../+state/song.actions';
import { AlbumProperties, ISong, SongProperties } from '../../../../models/artists-webapi';

@Injectable()
export class SongCrudFacade implements IDataEntryFacade<ISong> {
  loading$ = this.store.select(songsFeature.selectLoading);
  currentEntity$ = this.store.select(songQueries.selectCurrentSong);
  isEditActive$ = this.store.select(songQueries.selectIsEditSongActive);
  isNewActive$ = this.store.select(songQueries.selectIsNewSongActive);
  albums$ = this.store.select(songsFeature.selectAlbums);

  constructor(private readonly store: Store) { }

  public setCurrentEntity(item: ISong): void {
    this.store.dispatch(songActionTypes.setCurrentSong(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(songActionTypes.clearCurrentSong());
  }

  public saveNewEntity(item: ISong): void {
    this.store.dispatch(songActionTypes.saveSongRequest(item));
  }

  public updateExistingEntity(item: ISong): void {
    this.store.dispatch(songActionTypes.updateSongRequest(item));
  }

  public loadAlbums(state: ODataState): void {
    this.store.dispatch(songActionTypes.loadAlbumsRequest(state));
  }
}
