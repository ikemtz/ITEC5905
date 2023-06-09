/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { IArtist } from './artist.model';
import { ISong } from './song.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IArtistSong {
  id?: string | null;
  artistId?: string;
  songId?: string;
  index?: number | null;
  updateCount?: number | null;
  artist?: Partial<IArtist>;
  song?: Partial<ISong>;
}
