import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { artistsFeature } from '../+state/artist.reducer';
import * as artistsActionTypes from '../+state/artist.actions';
import { IArtist } from '../../../../models/artists-webapi';
import { map } from 'rxjs';

@Injectable()
export class ArtistListFacade implements IKendoODataGridFacade<IArtist>, IDataDeleteFacade<IArtist> {
  loading$ = this.store.select(artistsFeature.selectLoading);
  gridData$ = this.store.select(artistsFeature.selectGridData);
  gridPagerSettings$ = this.store.select(artistsFeature.selectGridPagerSettings);
  gridODataState$ = this.store.select(artistsFeature.selectGridODataState);

  constructor(private readonly store: Store) { }

  public loadEntities(state: ODataState): void {
    this.store.dispatch(artistsActionTypes.loadArtistsRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(artistsActionTypes.reloadArtistsRequest());
  }

  public deleteExistingEntity(entity: IArtist): void {
    this.store.dispatch(artistsActionTypes.deleteArtistRequest(entity));
  }
}
