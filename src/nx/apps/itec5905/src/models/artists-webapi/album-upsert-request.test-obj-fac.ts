/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { AlbumUpsertRequestProperties } from './album-upsert-request.properties';

export function createTestAlbumUpsertRequest() {
    return { 
      [AlbumUpsertRequestProperties.ID]: 'ID',
      [AlbumUpsertRequestProperties.NAME]: 'NAME',
      [AlbumUpsertRequestProperties.ARTIST_ID]: 'ARTIST_ID',
      [AlbumUpsertRequestProperties.PICTURE_IPFS_HASH]: 'PICTURE_IPFS_HASH',
      [AlbumUpsertRequestProperties.PICTURE_TYPE]: 'PICTURE_TYPE', 
    };
}
