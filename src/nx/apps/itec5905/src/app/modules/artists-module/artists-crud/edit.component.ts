import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { normalizeRequest } from 'imng-nrsrx-client-utils';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { ArtistBaseEntryComponent } from './base-entry.component';
import { ArtistCrudFacade } from './crud.facade';
import { tap } from 'rxjs';

@Component({
  selector: 'itec-artist-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistEditComponent
  extends ArtistBaseEntryComponent
  implements OnInit, OnDestroy {
  public dialogTitle = 'Edit Artist';
  public active$ = this.facade.isEditActive$;

  constructor(facade: ArtistCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    if (this.addEditForm) {
      this.allSubscriptions.push(
        this.facade.currentEntity$
          .pipe(
            formGroupPatcher(this.addEditForm),
            tap(
              (x) =>
              (this.selectedGeneres =
                x?.genres?.map((m) => m?.id || '') || [])
            )
          )
          .subscribe()
      );
    }
  }

  public save(): void {
    const value = normalizeRequest(this.addEditForm.value);
    value.genres = this.selectedGeneres;
    this.facade.updateExistingEntity(value, this.picture);
  }
}
