/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #model.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { IArtist } from './artist.model';
import { IAlbumSong } from './album-song.model';
import { IPicture } from './picture.model';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAlbum {
  id?: string | null;
  name?: string;
  artistId?: string;
  songCount?: number | null;
  pictureId?: string | null;
  updateCount?: number | null;
  artist?: Partial<IArtist>;
  songs?: Partial<IAlbumSong[]>;
  picture?: Partial<IPicture>;
}