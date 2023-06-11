import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { SongListFacade } from './list.facade';
import { SongCrudFacade } from '../songs-crud';
import {
  AlbumProperties,
  AlbumSongProperties,
  ArtistProperties,
  ArtistSongProperties,
  ISong,
  SongProperties,
} from '../../../../models/artists-webapi';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    SongProperties.ID,
    SongProperties.NAME,
    SongProperties.IPFS_HASH,
    SongProperties.PICTURE_IPFS_HASH,
    SongProperties.GENRE_ID,
  ],
  sort: [{ field: SongProperties.NAME, dir: 'asc' }],
  expanders: [
    {
      table: SongProperties.ALBUM_SONGS,
      selectors: [AlbumSongProperties.ID],
      expanders: [
        {
          table: AlbumSongProperties.ALBUM,
          selectors: [
            AlbumProperties.ID,
            AlbumProperties.NAME,
            AlbumProperties.PICTURE_IPFS_HASH,
            AlbumProperties.PICTURE_TYPE,
          ],
        },
      ],
    },
    {
      table: SongProperties.ARTIST_SONGS,
      expanders: [
        {
          table: ArtistSongProperties.ARTIST,
          selectors: [ArtistProperties.ID, ArtistProperties.STAGE_NAME],
        },
      ],
    },
  ],
};

@Component({
  selector: 'itec-song-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongListComponent extends KendoODataBasedComponent<
  ISong,
  SongListFacade
> {
  public readonly props = SongProperties;
  public readonly albumProps = AlbumProperties;
  public currentItem: ISong | undefined;

  constructor(
    facade: SongListFacade,
    public readonly crudFacade: SongCrudFacade
  ) {
    super(facade, initialGridState);
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
}
