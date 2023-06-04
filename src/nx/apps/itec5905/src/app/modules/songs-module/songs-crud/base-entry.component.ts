import { OnInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

import { AlbumProperties, IAlbum, ISong, ISongForm, SongFormGroupFac, SongProperties } from '../../../../models/artists-webapi';
import { SongCrudFacade } from './crud.facade';

@Component({ template: '' })
export abstract class SongBaseEntryComponent extends BaseDataEntryComponent<SongCrudFacade>
  implements OnInit {
  public readonly props = SongProperties;
  public readonly albumProps = AlbumProperties;
  public readonly albums$: Observable<IAlbum[]>;
  public readonly albumFilter$ = new BehaviorSubject('');
  public addEditForm: FormGroup<ISongForm>;

  constructor(facade: SongCrudFacade) {
    super(facade);
    this.albums$ = facade.albums$.pipe(
      switchMap(albums => this.albumFilter$.pipe(
        map(albumFilter => albumFilter ? albums
          .filter(album => (
            (album.name && album.name.toLowerCase().indexOf(albumFilter) >= 0) ||
            (album.artistId && album.artistId.toString().toLowerCase().indexOf(albumFilter) >= 0) ||
            (album.songCount && album.songCount.toString().toLowerCase().indexOf(albumFilter) >= 0) ||
            (album.pictureIpfsHash && album.pictureIpfsHash.toLowerCase().indexOf(albumFilter) >= 0) ||
            (album.updateCount && album.updateCount.toString().toLowerCase().indexOf(albumFilter) >= 0)
          )) : albums
        ))));
  }

  public ngOnInit(): void {
    this.initForm();
    this.facade.loadAlbums({
      selectors: [
        AlbumProperties.ID,
        AlbumProperties.NAME,
        AlbumProperties.ARTIST_ID,
        AlbumProperties.ARTIST,
        AlbumProperties.SONG_COUNT,
        AlbumProperties.PICTURE_IPFS_HASH,
        AlbumProperties.UPDATE_COUNT,]
    });
  }

  public initForm(): void {
    this.addEditForm = SongFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }

  public handleAlbumFilter(value: string) {
    this.albumFilter$.next(value.toLowerCase());
  }
}
