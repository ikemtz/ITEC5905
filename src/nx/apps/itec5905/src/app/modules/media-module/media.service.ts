import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMediaUpdateRequest, IMediaUploadRequest, IMediaUploadResponse, IMediaUpdateResponse } from '../../../models/media-webapi';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaApiService {

  public url = environment.endpoints.mediaWebApiEndpoints.media;
  constructor(private readonly http: HttpClient) {
  }

  public post(payload: IMediaUploadRequest): Observable<IMediaUploadResponse> {
    return this.http.post<IMediaUploadResponse>(this.url, payload);
  }
  public put(payload: IMediaUpdateRequest): Observable<IMediaUpdateResponse> {
    return this.http.put<IMediaUpdateResponse>(this.url, payload);
  }
  public delete(payload: string) {
    return this.http.delete<IMediaUpdateResponse>(`${this.url}?ipfsHash=${payload}`);
  }
}
