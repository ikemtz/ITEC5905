import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { ODataState } from 'imng-kendo-odata';
import { artistsFeature } from '../+state/artist.reducer';
import { artistQueries } from '../+state/artist.selectors';
import * as artistActionTypes from '../+state/artist.actions';
import { IArtist, IArtistUpsertRequest } from '../../../../models/artists-webapi';
import { IMediaUploadRequest } from '../../../../models/media-webapi';

@Injectable()
export class ArtistCrudFacade implements IDataEntryFacade<IArtist | IArtistUpsertRequest> {
  loading$ = this.store.select(artistsFeature.selectLoading);
  currentEntity$ = this.store.select(artistsFeature.selectCurrentArtist);
  isEditActive$ = this.store.select(artistQueries.selectIsEditArtistActive);
  isNewActive$ = this.store.select(artistQueries.selectIsNewArtistActive);
  genres$ = this.store.select(artistsFeature.selectGenres);

  constructor(private readonly store: Store) { }

  public setCurrentEntity(item: IArtist): void {
    this.store.dispatch(artistActionTypes.setCurrentArtist(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(artistActionTypes.clearCurrentArtist());
  }

  public saveNewEntity(item: IArtistUpsertRequest, picture?: IMediaUploadRequest): void {
    this.store.dispatch(artistActionTypes.saveArtistAndMediaRequest({
      artist: item,
      picture: picture,
    }));
  }

  public updateExistingEntity(item: IArtistUpsertRequest, picture?: IMediaUploadRequest): void {
    this.store.dispatch(artistActionTypes.updateArtistRequest({
      artist: item,
      picture: picture,
    }));
  }

  public loadPictures(state: ODataState): void {
    this.store.dispatch(artistActionTypes.loadPicturesRequest(state));
  }
  public loadGenres(state: ODataState): void {
    this.store.dispatch(artistActionTypes.loadGenresRequest(state));
  }
}
