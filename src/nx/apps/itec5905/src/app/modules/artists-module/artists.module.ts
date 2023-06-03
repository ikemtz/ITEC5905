import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { MenusModule } from "@progress/kendo-angular-menu";
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';
import { UploadsModule } from "@progress/kendo-angular-upload";

import { ArtistsRoutingModule } from './artists.routing';
import { artistsFeature } from './+state/artist.reducer';
import { ArtistEffects } from './+state/artist.effects';

import { ArtistListComponent, ArtistListFacade } from './artists-list';
import { ArtistAddComponent, ArtistEditComponent, ArtistApiService, ArtistCrudFacade } from './artists-crud';
import { MediaModule } from '../media-module';


@NgModule({
  declarations: [ArtistListComponent, ArtistAddComponent, ArtistEditComponent],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    DialogModule,
    DropDownsModule,
    MenusModule,
    UploadsModule,
    ImngDataEntryDialogModule,
    ImngKendoGridFilteringModule,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ReactiveFormsModule,
    ArtistsRoutingModule,
    StoreModule.forFeature(artistsFeature),
    EffectsModule.forFeature([ArtistEffects]),
    MediaModule,
  ],
  providers: [
    ArtistListFacade,
    ArtistCrudFacade,
    ArtistApiService,
  ],
})
export class ArtistsModule { }
