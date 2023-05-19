/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #form.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
import { FormControl, FormArray, FormGroup } from '@angular/forms'; //NOSONAR
import { IArtistForm } from './artist.form';

export interface IArtistGenreForm {
    id: FormControl<string | null | undefined>;
    name: FormControl<string>;
    artistId: FormControl<string>;
    createdBy: FormControl<string>;
    updatedBy: FormControl<string | null | undefined>;
    createdOnUtc: FormControl<Date | null | undefined>;
    updatedOnUtc: FormControl<Date | null | undefined>;
    updateCount: FormControl<number | null | undefined>;
    artist: FormGroup<IArtistForm>;
}
