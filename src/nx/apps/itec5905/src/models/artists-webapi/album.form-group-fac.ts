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
import { IAlbumForm } from './album.form';
import { IArtistForm } from './artist.form';
import { ArtistFormGroupFac } from './artist.form-group-fac';
import { IAlbumSongForm } from './album-song.form';

export function AlbumFormGroupFac(): FormGroup<IAlbumForm> {
  return new FormGroup<IAlbumForm>({
    id: new FormControl<string | null | undefined>(null),
    name: new FormControl<string>('', { validators: Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)]), nonNullable: true }),
    artistId: new FormControl<string>('', { validators: Validators.required, nonNullable: true } ),
    songCount: new FormControl<number | null | undefined>(null),
    pictureIpfsHash: new FormControl<string | null | undefined>(null, { validators: Validators.maxLength(255) } ),
    pictureType: new FormControl<string | null | undefined>(null, { validators: Validators.maxLength(50) } ),
    updateCount: new FormControl<number | null | undefined>(null),
    artist: new FormGroup<IArtistForm>(ArtistFormGroupFac().controls),
    albumSongs: new FormArray<FormGroup<IAlbumSongForm>>([]),
  });
}
