/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #form-group-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms'; //NOSONAR
import { ISongForm } from './song.form';
import { IAlbumForm } from './album.form';
import { AlbumFormGroupFac } from './album.form-group-fac';
import { IPictureForm } from './picture.form';
import { PictureFormGroupFac } from './picture.form-group-fac';
import { IArtistSongForm } from './artist-song.form';

export function SongFormGroupFac(): FormGroup<ISongForm> {
  return new FormGroup<ISongForm>({
    id: new FormControl<string | null | undefined>(null),
    name: new FormControl<string>('', { validators: Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)]), nonNullable: true }),
    albumId: new FormControl<string>('', { validators: Validators.required, nonNullable: true } ),
    pictureId: new FormControl<string | null | undefined>(null),
    updateCount: new FormControl<number | null | undefined>(null),
    album: new FormGroup<IAlbumForm>(AlbumFormGroupFac().controls),
    picture: new FormGroup<IPictureForm>(PictureFormGroupFac().controls),
    artistSongs: new FormArray<FormGroup<IArtistSongForm>>([]),
  });
}