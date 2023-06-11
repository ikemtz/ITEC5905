import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IAlbumUpsertRequest } from 'apps/itec5905/src/models/artists-webapi';

@Injectable({
  providedIn: 'root',
})
export class AlbumApiService extends NrsrxBaseApiClientService<IAlbumUpsertRequest> {
  public override url = environment.endpoints.artistsWebApiEnpoints.albums;
  constructor(http: HttpClient) {
    super(http);
  }
}
