import { OnInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { AlbumCrudFacade } from './crud.facade';
import {
  AlbumUpsertRequestFormGroupFac,
  AlbumUpsertRequestProperties,
  IAlbumUpsertRequestForm,
} from '../../../../models/artists-webapi';
import {
  fileContentRegex,
  fileTypeRegex,
  photoRestrictions,
} from '../../media-module';
import { SelectEvent } from '@progress/kendo-angular-upload';
import { IMediaUploadRequest } from '../../../../models/media-webapi';

@Component({ template: '' })
export abstract class AlbumBaseEntryComponent
  extends BaseDataEntryComponent<AlbumCrudFacade>
  implements OnInit {
  public readonly props = AlbumUpsertRequestProperties;
  public addEditForm: FormGroup<IAlbumUpsertRequestForm>;
  public photoRestrictions = photoRestrictions;
  public picture: IMediaUploadRequest;

  constructor(facade: AlbumCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = AlbumUpsertRequestFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }

  public selectPicture(e: SelectEvent): void {
    e.files.forEach((file) => {
      if (file && !file.validationErrors) {
        this.picture = {
          referenceType: 'Album',
        };
        this.picture.fileName = file.name;
        const reader = new FileReader();
        reader.onload = (fileReadProgress) => {
          const result = fileReadProgress.target?.result as string;
          this.picture.content = fileContentRegex.exec(result)?.[0] as string;
          this.picture.fileType = fileTypeRegex.exec(result)?.[0] as string;
        };
        reader.readAsDataURL(file.rawFile as Blob);
      }
    });
  }
}
