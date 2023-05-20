import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ArtistProperties, IArtist, PictureProperties } from '../../../../models/artists-od';

@Injectable({
  providedIn: 'root',
})
export class ArtistApiService extends NrsrxBaseApiClientService<IArtist> {
  public override url = environment.endpoints.artistsODataEnpoints.artists;
  constructor(http: HttpClient) {
    super(http);
  }
}
