import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { ArtistCrudFacade } from './crud.facade';
import { ArtistBaseEntryComponent } from './base-entry.component';

@Component({
  selector: 'itec-artist-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistAddComponent extends ArtistBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Add Artist';
  public active$ = this.facade.isNewActive$;

  constructor(facade: ArtistCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    const val = this.formatRequest(this.addEditForm.value);
    val.id = undefined;
    this.facade.saveNewEntity(val);
  }
}
