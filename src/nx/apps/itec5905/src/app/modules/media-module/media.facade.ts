import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mediaFeature } from './+state/media.reducer';
import * as mediaActionTypes from './+state/media.actions';
import { map } from 'rxjs';
import { IMediaUpdateRequest, IMediaUploadRequest } from '../../../models/media-webapi';

@Injectable()
export class MediaFacade {
  loading$ = this.store.select(mediaFeature.selectActiveOperations).pipe(map(x => !!x));

  constructor(private readonly store: Store) { }

  public saveMedia(item: IMediaUploadRequest): void {
    this.store.dispatch(mediaActionTypes.saveMediaRequest(item));
  }

  public updateMedia(item: IMediaUpdateRequest): void {
    this.store.dispatch(mediaActionTypes.updateMediaRequest(item));
  }

  public deleteMedia(ipfsHash: string): void {
    this.store.dispatch(mediaActionTypes.deleteMediaRequest(ipfsHash));
  }
}
