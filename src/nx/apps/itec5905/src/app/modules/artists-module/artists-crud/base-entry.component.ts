import { OnInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { ArtistCrudFacade } from './crud.facade';
import { ArtistProperties, ArtistUpsertRequestFormGroupFac, IArtistUpsertRequest, IArtistUpsertRequestForm } from '../../../../models/artists-webapi';
import { FileRestrictions, SelectEvent } from '@progress/kendo-angular-upload';

@Component({ template: '' })
export abstract class ArtistBaseEntryComponent extends BaseDataEntryComponent<ArtistCrudFacade>
  implements OnInit {
  private readonly imageTypeRegex = /^data:image\/([a-z]*)/;
  private readonly imageRegex = /[A-z0-9=/+]*$/;
  public readonly props = ArtistProperties;
  public addEditForm: FormGroup<IArtistUpsertRequestForm>;
  public imageSrc: string;
  public imageType: string;
  public restrictions: FileRestrictions = {
    allowedExtensions: ["jpg", "jpeg", "png"],
    maxFileSize: 1000000,
  };

  constructor(facade: ArtistCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
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
        const reader = new FileReader();
        reader.onload = fileReadProgress => {
          const result = fileReadProgress.target?.result as string;
          this.imageSrc = this.imageRegex.exec(result)?.[0] as string;
          this.imageType = this.imageTypeRegex.exec(result)?.[1] as string;
        };
        reader.readAsDataURL(file.rawFile as Blob);
      }
    });
  }

  public formatRequest(request: IArtistUpsertRequest): IArtistUpsertRequest {
    request.picture = this.imageSrc;
    request.pictureType = this.imageType;
    return normalizeRequest(request);
  }

}
