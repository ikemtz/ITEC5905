import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { artistsFeature } from '../+state/artist.reducer';
import { albumQueries } from '../+state/album.selectors';
import * as albumActionTypes from '../+state/album.actions';
import { IAlbumUpsertRequest } from 'apps/itec5905/src/models/artists-webapi';
import { IMediaUploadRequest } from 'apps/itec5905/src/models/media-webapi';

@Injectable()
export class AlbumCrudFacade implements IDataEntryFacade<IAlbumUpsertRequest> {
  loading$ = this.store.select(artistsFeature.selectLoading);
  currentEntity$ = this.store.select(artistsFeature.selectCurrentAlbum);
  isEditActive$ = this.store.select(albumQueries.selectIsEditAlbumActive);
  isNewActive$ = this.store.select(albumQueries.selectIsNewAlbumActive);

  constructor(private readonly store: Store) { }

  public setCurrentEntity(item: IAlbumUpsertRequest): void {
    this.store.dispatch(albumActionTypes.setCurrentAlbumRequest(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(albumActionTypes.clearCurrentAlbumRequest());
  }

  public saveNewEntity(item: IAlbumUpsertRequest, picture?: IMediaUploadRequest): void {
    this.store.dispatch(albumActionTypes.saveAlbumAndMediaRequest({
      album: item,
      picture: picture,
    }));
  }

  public updateExistingEntity(item: IAlbumUpsertRequest, picture?: IMediaUploadRequest): void {
    this.store.dispatch(albumActionTypes.updateAlbumRequest({
      album: item,
      picture: picture,
    }));
  }

}
