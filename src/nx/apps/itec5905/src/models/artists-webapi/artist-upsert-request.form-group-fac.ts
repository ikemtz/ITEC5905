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
import { IArtistUpsertRequestForm } from './artist-upsert-request.form';
import { IArtistGenreUpsertRequestForm } from './artist-genre-upsert-request.form';

export function ArtistUpsertRequestFormGroupFac(): FormGroup<IArtistUpsertRequestForm> {
  return new FormGroup<IArtistUpsertRequestForm>({
    id: new FormControl<string | null | undefined>(null),
    name: new FormControl<string>('', { validators: Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)]), nonNullable: true }),
    stageName: new FormControl<string>('', { validators: Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)]), nonNullable: true }),
    email: new FormControl<string>('', { validators: Validators.compose([Validators.required, Validators.email, Validators.minLength(2), Validators.maxLength(255)]), nonNullable: true }),
    pictureIpfsHash: new FormControl<string | null | undefined>(null, { validators: Validators.maxLength(255) } ),
    pictureType: new FormControl<string | null | undefined>(null, { validators: Validators.maxLength(50) } ),
    genres: new FormArray<FormGroup<IArtistGenreUpsertRequestForm>>([]),
  });
}
