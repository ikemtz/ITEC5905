/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { AlbumProperties } from './album.properties';

export function createTestAlbum() {
    return { 
      [AlbumProperties.ID]: 'ID',
      [AlbumProperties.NAME]: 'NAME',
      [AlbumProperties.ARTIST_ID]: 'ARTIST_ID',
      [AlbumProperties.SONG_COUNT]: 0,
      [AlbumProperties.PICTURE_IPFS_HASH]: 'PICTURE_IPFS_HASH',
      [AlbumProperties.PICTURE_TYPE]: 'PICTURE_TYPE',
      [AlbumProperties.UPDATE_COUNT]: 0, 
      [AlbumProperties.ARTIST]: undefined,
      [AlbumProperties.ALBUM_SONGS]: [],
    };
}
