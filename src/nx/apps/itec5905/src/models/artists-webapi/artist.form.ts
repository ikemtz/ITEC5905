/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #form.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */
import { FormControl, FormArray, FormGroup } from '@angular/forms'; //NOSONAR
import { IArtistGenreForm } from './artist-genre.form';
import { IAlbumForm } from './album.form';
import { IArtistSongForm } from './artist-song.form';
import { IPictureForm } from './picture.form';

export interface IArtistForm {
    id: FormControl<string | null | undefined>;
    name: FormControl<string>;
    stageName: FormControl<string>;
    email: FormControl<string>;
    albumCount: FormControl<number | null | undefined>;
    songCount: FormControl<number | null | undefined>;
    pictureId: FormControl<string | null | undefined>;
    updateCount: FormControl<number | null | undefined>;
    genres: FormArray<FormGroup<IArtistGenreForm>>;
    albums: FormArray<FormGroup<IAlbumForm>>;
    artistSongs: FormArray<FormGroup<IArtistSongForm>>;
    picture: FormGroup<IPictureForm>;
}
