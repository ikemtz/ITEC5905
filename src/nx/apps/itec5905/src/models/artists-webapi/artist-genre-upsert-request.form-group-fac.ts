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
import { IArtistGenreUpsertRequestForm } from './artist-genre-upsert-request.form';

export function ArtistGenreUpsertRequestFormGroupFac(): FormGroup<IArtistGenreUpsertRequestForm> {
  return new FormGroup<IArtistGenreUpsertRequestForm>({
    id: new FormControl<string | null | undefined>(null),
    name: new FormControl<string>('', { validators: Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)]), nonNullable: true }),
  });
}