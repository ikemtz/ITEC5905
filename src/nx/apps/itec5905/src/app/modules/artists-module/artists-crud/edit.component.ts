import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { ArtistBaseEntryComponent } from './base-entry.component';
import { ArtistCrudFacade } from './crud.facade';
import { IArtist } from '../../../../models/artists-webapi';

@Component({
  selector: 'itec-artist-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistEditComponent extends ArtistBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Edit Artist';
  public active$ = this.facade.isEditActive$;

  constructor(facade: ArtistCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    if (this.addEditForm) {
      this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
    }
  }

  public save(): void {
    const val = normalizeRequest<IArtist>(this.addEditForm.value);
    this.facade.updateExistingEntity(val);
  }
}
