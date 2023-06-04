import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { SongListFacade } from './list.facade';
import { SongCrudFacade } from '../songs-crud';
import { AlbumProperties, ISong, SongProperties } from '../../../../models/artists-webapi';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    SongProperties.ID,
    SongProperties.NAME,
    SongProperties.ALBUM_ID,
    SongProperties.IPFS_HASH,
    SongProperties.PICTURE_IPFS_HASH,
    SongProperties.UPDATE_COUNT,
  ],
  sort: [
    { field: SongProperties.NAME, dir: 'asc' },
  ],
  expanders: [
    {
      table: SongProperties.ALBUM,
      selectors: [
        AlbumProperties.ID,
        AlbumProperties.NAME,
        AlbumProperties.ARTIST_ID,
        AlbumProperties.ARTIST,
        AlbumProperties.SONG_COUNT,
        AlbumProperties.PICTURE_IPFS_HASH,
        AlbumProperties.UPDATE_COUNT,
      ]
    },
  ]
};

@Component({
  selector: 'itec-song-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongListComponent extends KendoODataBasedComponent<ISong, SongListFacade> {
  public readonly props = SongProperties;
  public readonly albumProps = AlbumProperties;
  public currentItem: ISong | undefined;

  constructor(facade: SongListFacade,
    public readonly crudFacade: SongCrudFacade,
    router: Router) {
    super(facade, initialGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: ISong): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: ISong): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
