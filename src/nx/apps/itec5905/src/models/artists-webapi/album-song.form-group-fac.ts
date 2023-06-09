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
import { IAlbumSongForm } from './album-song.form';
import { IAlbumForm } from './album.form';
import { AlbumFormGroupFac } from './album.form-group-fac';
import { ISongForm } from './song.form';
import { SongFormGroupFac } from './song.form-group-fac';

export function AlbumSongFormGroupFac(): FormGroup<IAlbumSongForm> {
  return new FormGroup<IAlbumSongForm>({
    id: new FormControl<string | null | undefined>(null),
    albumId: new FormControl<string>('', { validators: Validators.required, nonNullable: true } ),
    songId: new FormControl<string>('', { validators: Validators.required, nonNullable: true } ),
    updateCount: new FormControl<number | null | undefined>(null),
    album: new FormGroup<IAlbumForm>(AlbumFormGroupFac().controls),
    song: new FormGroup<ISongForm>(SongFormGroupFac().controls),
  });
}
