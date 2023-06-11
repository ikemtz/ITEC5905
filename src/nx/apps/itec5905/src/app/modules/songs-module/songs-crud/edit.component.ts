import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { ISong } from '../../../../models/artists-webapi';
import { SongBaseEntryComponent } from './base-entry.component';
import { SongCrudFacade } from './crud.facade';

@Component({
  selector: 'itec-song-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongEditComponent
  extends SongBaseEntryComponent
  implements OnInit, OnDestroy {
  public dialogTitle = 'Edit Song';
  public active$ = this.facade.isEditActive$;

  constructor(facade: SongCrudFacade) {
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
    const val = normalizeRequest<ISong>(this.addEditForm.value);
    this.facade.updateExistingEntity(val);
  }
}
