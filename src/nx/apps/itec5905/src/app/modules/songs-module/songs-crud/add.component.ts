import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { normalizeRequest } from 'imng-nrsrx-client-utils';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { SongCrudFacade } from './crud.facade';
import { SongBaseEntryComponent } from './base-entry.component';
import { ISongUpsertRequest } from '../../../../models/artists-webapi';

@Component({
  selector: 'itec-song-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongAddComponent
  extends SongBaseEntryComponent
  implements OnInit, OnDestroy {
  public dialogTitle = 'Add Song';
  public active$ = this.facade.isNewActive$;

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
    const val = normalizeRequest<ISongUpsertRequest>(this.addEditForm.value);
    val.id = undefined;
    this.facade.saveNewEntity(val, this.audio, this.picture);
  }
}
