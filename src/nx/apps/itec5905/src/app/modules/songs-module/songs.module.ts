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

import { SongsRoutingModule } from './songs.routing';
import { songsFeature } from './+state/song.reducer';
import { SongEffects } from './+state/song.effects';

import { SongListComponent, SongListFacade } from './songs-list';
import { SongAddComponent, SongEditComponent, SongApiService, SongCrudFacade } from './songs-crud';
import { UploadsModule } from "@progress/kendo-angular-upload";


@NgModule({
  declarations: [SongListComponent, SongAddComponent, SongEditComponent],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    DialogModule,
    DropDownsModule,
    MenusModule,
    ImngDataEntryDialogModule,
    ImngKendoGridFilteringModule,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ReactiveFormsModule,
    SongsRoutingModule,
    StoreModule.forFeature(songsFeature),
    EffectsModule.forFeature([SongEffects]),
    UploadsModule,
  ],
  providers: [
    SongListFacade,
    SongCrudFacade,
    SongApiService,
  ],
})
export class SongsModule { }
