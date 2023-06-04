import { OnInit, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { ArtistCrudFacade } from './crud.facade';
import {
  ArtistUpsertRequestFormGroupFac,
  ArtistUpsertRequestProperties,
  GenreProperties,
  IArtistUpsertRequestForm,
  IGenre,
} from '../../../../models/artists-webapi';
import { FileRestrictions, SelectEvent } from '@progress/kendo-angular-upload';
import { IMediaUploadRequest } from '../../../../models/media-webapi';
import { Observable } from 'rxjs';

@Component({ template: '' })
export abstract class ArtistBaseEntryComponent
  extends BaseDataEntryComponent<ArtistCrudFacade>
  implements OnInit {
  private readonly imageTypeRegex = /^data:[a-z/;0-9]*;base64/;
  private readonly imageRegex = /[A-z0-9=/+]*$/;
  public readonly props = ArtistUpsertRequestProperties;
  public addEditForm: FormGroup<IArtistUpsertRequestForm>;
  public genres$: Observable<IGenre[]>;
  public artistPicture: IMediaUploadRequest;
  public restrictions: FileRestrictions = {
    allowedExtensions: ['jpg', 'jpeg', 'png'],
    maxFileSize: 1000000,
  };
  public selectedGeneres: Array<string> = [];

  constructor(facade: ArtistCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
    this.facade.loadGenres({ count: false });
    this.genres$ = this.facade.genres$;
  }

  public initForm(): void {
    this.addEditForm = ArtistUpsertRequestFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }

  public selectPicture(e: SelectEvent): void {
    e.files.forEach((file) => {
      if (file && !file.validationErrors) {
        this.artistPicture = {
          referenceType: 'Artist',
        };
        this.artistPicture.fileName = file.name;
        const reader = new FileReader();
        reader.onload = (fileReadProgress) => {
          const result = fileReadProgress.target?.result as string;
          this.artistPicture.content = this.imageRegex.exec(
            result
          )?.[0] as string;
          this.artistPicture.fileType = this.imageTypeRegex.exec(
            result
          )?.[0] as string;
        };
        reader.readAsDataURL(file.rawFile as Blob);
      }
    });
  }
  public onGenreChange(value: string[]) {
    this.selectedGeneres = value;
  }
}
