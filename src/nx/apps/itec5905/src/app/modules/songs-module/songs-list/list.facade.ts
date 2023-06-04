import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { songsFeature } from '../+state/song.reducer';
import * as songActionTypes from '../+state/song.actions';
import { ISong } from '../../../../models/artists-webapi';

@Injectable()
export class SongListFacade implements IKendoODataGridFacade<ISong>, IDataDeleteFacade<ISong> {
  loading$ = this.store.select(songsFeature.selectLoading);
  gridData$ = this.store.select(songsFeature.selectGridData);
  gridPagerSettings$ = this.store.select(songsFeature.selectGridPagerSettings);
  gridODataState$ = this.store.select(songsFeature.selectGridODataState);

  constructor(private readonly store: Store) { }

  public loadEntities(state: ODataState): void {
    this.store.dispatch(songActionTypes.loadSongsRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(songActionTypes.reloadSongsRequest());
  }

  public deleteExistingEntity(entity: ISong): void {
    this.store.dispatch(songActionTypes.deleteSongRequest(entity));
  }
}
