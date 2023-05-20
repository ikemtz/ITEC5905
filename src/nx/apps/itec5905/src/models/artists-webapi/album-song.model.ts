/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { IAlbum } from './album.model';
import { ISong } from './song.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAlbumSong {
  id?: string | null;
  albumId?: string;
  songId?: string;
  updateCount?: number | null;
  album?: Partial<IAlbum>;
  song?: Partial<ISong>;
}
