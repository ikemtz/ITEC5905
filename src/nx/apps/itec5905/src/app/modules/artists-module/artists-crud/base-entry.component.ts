import { OnInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

import { ArtistCrudFacade } from './crud.facade';
import { ArtistFormGroupFac, ArtistProperties, IArtistForm, IPicture, PictureProperties } from '../../../../models/artists-odata';

@Component({ template: '' })
export abstract class ArtistBaseEntryComponent extends BaseDataEntryComponent<ArtistCrudFacade>
  implements OnInit {
  public readonly props = ArtistProperties;
  public readonly pictureProps = PictureProperties;
  public readonly pictures$: Observable<IPicture[]>;
  public readonly pictureFilter$ = new BehaviorSubject('');
  public addEditForm: FormGroup<IArtistForm>;

  constructor(facade: ArtistCrudFacade) {
    super(facade);
    this.pictures$ = facade.pictures$.pipe(
      switchMap(pictures => this.pictureFilter$.pipe(
        map(pictureFilter => pictureFilter ? pictures
          .filter(picture => (
            (picture.blob && picture.blob.toString().toLowerCase().indexOf(pictureFilter) >= 0) ||
            (picture.type && picture.type.toLowerCase().indexOf(pictureFilter) >= 0) ||
            (picture.updateCount && picture.updateCount.toString().toLowerCase().indexOf(pictureFilter) >= 0)
          )) : pictures
        ))));
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = ArtistFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }

  public handlePictureFilter(value: string) {
    this.pictureFilter$.next(value.toLowerCase());
  }
}
