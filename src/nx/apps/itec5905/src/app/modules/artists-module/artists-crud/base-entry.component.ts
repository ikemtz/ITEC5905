import { OnInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { ArtistCrudFacade } from './crud.facade';
import {
  ArtistUpsertRequestFormGroupFac,
  ArtistUpsertRequestProperties,
  GenreProperties,
  IArtistUpsertRequestForm,
} from '../../../../models/artists-webapi';
import { SelectEvent } from '@progress/kendo-angular-upload';
import { IMediaUploadRequest } from '../../../../models/media-webapi';
import { Observable, map } from 'rxjs';
import { fileContentRegex, fileTypeRegex, photoRestrictions } from '../../media-module';

@Component({ template: '' })
export abstract class ArtistBaseEntryComponent
  extends BaseDataEntryComponent<ArtistCrudFacade>
  implements OnInit {
  public readonly props = ArtistUpsertRequestProperties;
  public addEditForm: FormGroup<IArtistUpsertRequestForm>;
  public genres$: Observable<string[]>;
  public picture: IMediaUploadRequest;
  public photoRestrictions = photoRestrictions;
  public selectedGeneres: Array<string> = [];

  constructor(facade: ArtistCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
    this.facade.loadGenres({ selectors: [GenreProperties.ID], count: false });
    this.genres$ = this.facade.genres$.pipe(
      map((x) => x.map((m) => m.id ?? ''))
    );
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
        this.picture = {
          referenceType: 'Artist',
        };
        this.picture.fileName = file.name;
        const reader = new FileReader();
        reader.onload = (fileReadProgress) => {
          const result = fileReadProgress.target?.result as string;
          this.picture.content = fileContentRegex.exec(result)?.[0] as string;
          this.picture.fileType = fileTypeRegex.exec(
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
