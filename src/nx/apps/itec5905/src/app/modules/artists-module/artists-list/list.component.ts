import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { ArtistListFacade } from './list.facade';
import { ArtistCrudFacade } from '../artists-crud';
import { ArtistProperties, IArtist } from '../../../../models/artists-webapi';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    ArtistProperties.ID,
    ArtistProperties.NAME,
    ArtistProperties.STAGE_NAME,
    ArtistProperties.EMAIL,
    ArtistProperties.ALBUM_COUNT,
    ArtistProperties.SONG_COUNT,
    ArtistProperties.PICTURE_IPFS_HASH,
  ],
  sort: [
    { field: ArtistProperties.NAME, dir: 'asc' },
  ],
};

@Component({
  selector: 'itec-artist-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistListComponent extends KendoODataBasedComponent<IArtist, ArtistListFacade> {
  public readonly props = ArtistProperties;
  public currentItem: IArtist | undefined;

  constructor(facade: ArtistListFacade,
    public readonly crudFacade: ArtistCrudFacade,
    router: Router) {
    super(facade, initialGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: IArtist): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: IArtist): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
