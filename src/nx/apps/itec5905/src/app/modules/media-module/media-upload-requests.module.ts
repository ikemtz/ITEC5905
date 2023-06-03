import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { mediaFeature } from './+state/media.reducer';
import { MediaUploadRequestEffects } from './+state/media.effects';
import { MediaApiService } from './media.service';
import { MediaFacade } from './media.facade';
import { ImageApiService } from './image.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(mediaFeature),
    EffectsModule.forFeature([MediaUploadRequestEffects]),
  ],
  providers: [
    MediaApiService, MediaFacade, ImageApiService
  ],
})
export class MediaModule { }
