import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { ODataState } from 'imng-kendo-odata';
import { artistsFeature } from '../+state/artist.reducer';
import { artistQueries } from '../+state/artist.selectors';
import * as artistActionTypes from '../+state/artist.actions';
import { IArtist, IArtistUpsertRequest } from '../../../../models/artists-webapi';

@Injectable()
export class ArtistCrudFacade implements IDataEntryFacade<IArtist | IArtistUpsertRequest> {
  loading$ = this.store.select(artistsFeature.selectLoading);
  currentEntity$ = this.store.select(artistQueries.selectCurrentArtist);
  isEditActive$ = this.store.select(artistQueries.selectIsEditArtistActive);
  isNewActive$ = this.store.select(artistQueries.selectIsNewArtistActive);

  constructor(private readonly store: Store) { }

  public setCurrentEntity(item: IArtist): void {
    this.store.dispatch(artistActionTypes.setCurrentArtist(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(artistActionTypes.clearCurrentArtist());
  }

  public saveNewEntity(item: IArtistUpsertRequest): void {
    this.store.dispatch(artistActionTypes.saveArtistRequest(item));
  }

  public updateExistingEntity(item: IArtistUpsertRequest): void {
    this.store.dispatch(artistActionTypes.updateArtistRequest(item));
  }

  public loadPictures(state: ODataState): void {
    this.store.dispatch(artistActionTypes.loadPicturesRequest(state));
  }
}
