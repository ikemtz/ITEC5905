import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AlbumProperties, IAlbum, ISong, ISongForm, SongFormGroupFac, SongProperties } from '../../../../models/artists-webapi';

@Injectable({
  providedIn: 'root',
})
export class SongApiService extends NrsrxBaseApiClientService<ISong> {
  public override url = environment.endpoints.artistsWebApiEnpoints.songs;
  constructor(http: HttpClient) {
    super(http);
  }
}
