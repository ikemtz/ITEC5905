/* istanbul ignore file */
/**
 * This file is generated by the openapi-ts-generator
 * #test-object-factory.ts.hbs
 * For issues or feature request, visit the repo: https://github.com/ikemtz/openapi-ts-generator
 * Do not edit.
 */

import { ArtistGenreProperties } from './artist-genre.properties';

export function createTestArtistGenre() {
    return { 
      [ArtistGenreProperties.ID]: 'ID',
      [ArtistGenreProperties.NAME]: 'NAME',
      [ArtistGenreProperties.ARTIST_ID]: 'ARTIST_ID',
      [ArtistGenreProperties.CREATED_BY]: 'CREATED_BY',
      [ArtistGenreProperties.UPDATED_BY]: 'UPDATED_BY',
      [ArtistGenreProperties.CREATED_ON_UTC]: new Date(),
      [ArtistGenreProperties.UPDATED_ON_UTC]: new Date(),
      [ArtistGenreProperties.UPDATE_COUNT]: 0, 
      [ArtistGenreProperties.ARTIST]: undefined,
    };
}
