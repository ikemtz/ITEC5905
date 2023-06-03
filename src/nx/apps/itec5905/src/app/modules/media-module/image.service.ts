import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageApiService {

  public url = environment.endpoints.mediaWebApiEndpoints.images;
  constructor(private readonly http: HttpClient) {
  }

  public get(ipfsHash?: string | null, fileType?: string | null): Observable<string> {
    return this.http.get<{ data: string }>(`${this.url}?ipfsHash=${ipfsHash}&$fileType=${fileType}`).pipe(
      map(image => `${fileType},${image.data}`));
  }
}
