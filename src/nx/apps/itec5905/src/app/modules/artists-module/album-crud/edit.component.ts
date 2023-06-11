import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { AlbumBaseEntryComponent } from './base-entry.component';
import { AlbumCrudFacade } from './crud.facade';
import { IAlbumUpsertRequest } from 'apps/itec5905/src/models/artists-webapi';

@Component({
  selector: 'itec-album-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumEditComponent
  extends AlbumBaseEntryComponent
  implements OnInit, OnDestroy {
  public dialogTitle = 'Edit Album';
  public active$ = this.facade.isEditActive$;

  constructor(facade: AlbumCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    if (this.addEditForm) {
      this.allSubscriptions.push(
        this.facade.currentEntity$
          .pipe(formGroupPatcher(this.addEditForm))
          .subscribe()
      );
    }
  }

  public save(): void {
    const value = normalizeRequest<IAlbumUpsertRequest>(this.addEditForm.value);
    this.facade.updateExistingEntity(value, this.picture);
  }
}
