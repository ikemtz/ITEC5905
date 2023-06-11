import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { AlbumCrudFacade } from './crud.facade';
import { AlbumBaseEntryComponent } from './base-entry.component';
import { IAlbumUpsertRequest } from 'apps/itec5905/src/models/artists-webapi';
import { formGroupPatcher } from 'imng-kendo-data-entry';

@Component({
  selector: 'itec-album-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumAddComponent
  extends AlbumBaseEntryComponent
  implements OnInit, OnDestroy {
  public dialogTitle = 'Add Album';
  public active$ = this.facade.isNewActive$;

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
    const val = normalizeRequest<IAlbumUpsertRequest>(this.addEditForm.value);
    val.id = undefined;
    this.facade.saveNewEntity(val, this.picture);
  }
}

