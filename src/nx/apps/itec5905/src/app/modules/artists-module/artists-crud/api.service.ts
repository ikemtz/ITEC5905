import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IArtist, IArtistUpsertRequest } from '../../../../models/artists-webapi';

@Injectable({
  providedIn: 'root',
})
export class ArtistApiService extends NrsrxBaseApiClientService<IArtistUpsertRequest | IArtist> {
  public override url = environment.endpoints.artistsWebApiEnpoints.artists;
  constructor(http: HttpClient) {
    super(http);
  }
}
